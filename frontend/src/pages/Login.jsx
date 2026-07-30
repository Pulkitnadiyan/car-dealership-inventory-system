import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const login = auth?.login;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.token
            );
            if (login) {
                login(response.data.token);
            }
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
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
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-semibold mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-gray-500 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold text-gray-500 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded text-sm transition-colors cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-800 ml-1 font-semibold transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;