import React from 'react'
import SignInForm from '../components/features/Auth/SignInFormAuth'

function Login() {
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <SignInForm />
            </section>
        </main>
    )
}

export default Login
