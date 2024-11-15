import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
 
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
            console.log(response);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            if (response.data.token) {
                navigate('/dashboard');
            } else {
                setError('Invalid login credentials.');
            }
        } catch (error) {
            setError('Error logging in. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <p className='text-center text-gray-800 mb-6'>login for admin</p>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
