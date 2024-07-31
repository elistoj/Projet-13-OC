import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    changeUserCredentials,
    getAuthError,
    getAuthStatus,
    getUserToken,
} from './SliceAuth';
import Loader from '../../../utils/Loader/Loader';

function AuthForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localStorageEmail = localStorage.getItem('email') || '';
    const localStoragePassword = localStorage.getItem('password') || '';
    const [credentials, setCredentials] = useState({
        email: localStorageEmail,
        password: localStoragePassword,
    });
    const [rememberMe, setRememberMe] = useState(true);

    const authError = useSelector(getAuthError);
    const authStatus = useSelector(getAuthStatus);

    const handleRememberMe = useCallback(() => {
        setRememberMe((prev) => !prev);
    }, []);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (rememberMe) {
            localStorage.setItem('email', credentials.email);
            localStorage.setItem('password', credentials.password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
        await dispatch(changeUserCredentials(credentials));
        await dispatch(getUserToken(credentials));
        navigate('/profile');
    }, [credentials, rememberMe, dispatch, navigate]);

    let content;
    if (authStatus === 'failed') {
        content = <span className="errorMessage">{authError}</span>;
    } else if (authStatus === 'loading') {
        content = <Loader />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="email"
                    autoFocus
                    value={credentials.email}
                    onChange={handleChange}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
            {content}
        </form>
    );
}

export default AuthForm;
