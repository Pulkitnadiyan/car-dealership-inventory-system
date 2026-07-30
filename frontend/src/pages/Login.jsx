import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();
    const login = auth?.login;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

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
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Car Dealership
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            className="w-full border rounded-lg px-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 font-medium"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="w-full border rounded-lg px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-5">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>
        </div>
    );
}

export default Login;