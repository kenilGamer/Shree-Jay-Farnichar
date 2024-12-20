import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const REACT_APP_API_URL = import.meta.env.VITE_API_URL || "https://godcraft.fun";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
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
                console.error("Error response data: ", error.response.data);
                setError('Error logging in. Please try again later.');
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
        <div className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
            <div className="w-[20em] h-[60vh] bg-[#ffffff68] rounded-xl backdrop-blur-lg bg-opacity-50 shadow-lg flex flex-col items-center justify-center p-6">
                
                <h1 className="text-2xl font-bold text-white mb-6">Admin Login </h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-col items-center w-full"
                >
                    <div className="w-full">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="mt-1 p-2 w-full text-black rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={email}
                            placeholder="Username or Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 p-2 w-full text-black rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link to="/forgot-password" className="text-white text-sm hover:underline">
                        Forgot Password?
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;
