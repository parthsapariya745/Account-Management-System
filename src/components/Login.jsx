import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password.');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(
            (u) => u.email === formData.email && u.password === formData.password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/profile');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-10 bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-gray-100/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Sign in to your account
                    </h2>
                    <p className="mt-3 text-sm text-gray-500">
                        Welcome back — let's get you logged in
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm font-medium shadow-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-400 text-sm"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-400 text-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Signup link */}
                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150 hover:underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;