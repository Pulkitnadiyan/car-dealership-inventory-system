import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../utils/jwt";

function Navbar() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const decoded = decodeToken(token);
    const isAdmin = decoded && decoded.role === "ADMIN";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 tracking-tight">
                            {/* Simple Car SVG icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 16.5V12M5 16.5V12m0 0a2 2 0 012-2h10a2 2 0 012 2m-14 0V9a2 2 0 012-2h10a2 2 0 012 2v3m-16 4.5h18m-2 0a1.5 1.5 0 11-3 0m-12 0a1.5 1.5 0 11-3 0" />
                            </svg>
                            <span>DEALERSHIP</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                        >
                            Home
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
