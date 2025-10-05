import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const REACT_APP_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Making login request to:', `${REACT_APP_API_URL}/login`);
            console.log('Request data:', { email, password });
            
            const response = await axios.post(
                `${REACT_APP_API_URL}/login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                    validateStatus: (status) => status >= 200 && status < 300,
                }
            );

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            if (response.data.token) {
                navigate('/dashboard');
            } else {
                setError('Invalid login credentials.');
            }
        } catch (error) {
            console.error("Error details:", error);
            if (error.response) {
                console.error("Error response status:", error.response.status);
                console.error("Error response data: ", error.response.data);
                console.error("Error response headers: ", error.response.headers);
                setError(`Login failed: ${error.response.data?.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error("Error request: ", error.request);
                setError('Network error. Please check your connection.');
            } else {
                console.error("Error message: ", error.message);
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google login functionality not implemented yet.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center pt-32">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="card-modern">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            
                            <h1 className="heading-md text-white mb-4">Admin Login</h1>
                            <p className="text-gray-300">
                                Sign in to access your dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3AA62] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link 
                                    to="/contact" 
                                    className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300 font-medium"
                                >
                                    Contact us
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
