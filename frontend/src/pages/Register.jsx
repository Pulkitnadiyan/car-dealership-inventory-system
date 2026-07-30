import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await registerUser({ username, email, password });
            setSuccess("Registration successful!");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center bg-slate-50 pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 tracking-tight">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 16.5V12M5 16.5V12m0 0a2 2 0 012-2h10a2 2 0 012 2m-14 0V9a2 2 0 012-2h10a2 2 0 012 2v3m-16 4.5h18m-2 0a1.5 1.5 0 11-3 0m-12 0a1.5 1.5 0 11-3 0" />
                        </svg>
                        <span>DEALERSHIP</span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Create a new account
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-semibold mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-600 p-3 rounded text-sm font-semibold mb-4 text-center border border-green-100">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-xs font-semibold text-gray-500 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-semibold text-gray-500 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded text-sm transition-colors cursor-pointer"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-800 ml-1 font-semibold transition-colors"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;