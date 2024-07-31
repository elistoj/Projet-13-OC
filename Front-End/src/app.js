import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './features/auth/SignInFormAuth';
import UserEditForm from './features/user/EditForm';
import { useSelector } from 'react-redux';
import { getAuthConnected } from './features/auth/SliceAuth';

function App() {
    const connected = useSelector(getAuthConnected);

    return (
        <Router>
            <Routes>
                <Route path="/" element={connected ? <UserEditForm /> : <AuthForm />} />
            </Routes>
        </Router>
    );
}

export default App;
