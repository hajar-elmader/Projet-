import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const errRef = useRef('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email,
                password,
            });

            const { token, role, firstname, lastname } = response.data;

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Check the user's role and redirect accordingly
            if (role === 'USER') {
                window.location.href = `/espaceclient?firstname=${response.data.firstname}&lastname=${response.data.lastname}&email=${response.data.email}`;
            } else if (role === 'ADMIN') {
                window.location.href = `/banque?firstname=${response.data.firstname}&lastname=${response.data.lastname}&email=${response.data.email}`;
            } else {
                // Handle other roles or scenarios
            }
        } catch (error) {
            setEmail('');
            setPassword('');
            setError('Votre compte n\'est pas confirmé ou les informations sont incorrectes.');
        }
    };
    const divStyle = {
        marginTop: '123px',
        // Add more styles as needed
      };
    return (
        <div style={divStyle}>
            <div className="h-100 m-5">
                <div className="authincation h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-md-6">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form">
                                                <div className="text-center mb-3">
                                                    <a href="index.html"><img src="images/logo-full.png" alt="" /></a>
                                                </div>
                                                <h4 className="text-center mb-4 text-white">Sign in your account</h4>

                                                {error && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {error}
                                                    </div>
                                                )}

                                                <form>
                                                    <div className="form-group">
                                                        <label className="mb-1 text-white"><strong>Email</strong></label>
                                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Entrer votre email' />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-1 text-white"><strong>Password</strong></label>
                                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Entrer votre password' />
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="button" className="btn bg-white text-primary btn-block" onClick={handleLogin}>Login</button>
                                                    </div>
                                                </form>
                                                <div className="new-account mt-3">
                                                    <p className="text-white">Don't have an account? <Link className="text-white" to={'/register'}>Sign up</Link></p>
                                                </div>
                                                <div className="new-account mt-3">
                                                    <p className="text-white">
                                                        Forgot password?    
                                                        <Link className="text-white" to={'/reset-password'}>
                                                             Reset Password
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
