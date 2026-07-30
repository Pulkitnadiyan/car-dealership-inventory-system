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
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-600 tracking-wider">
                                DEALERSHIP
                            </Link>
                        </div>
                        <div className="flex sm:ml-6 sm:space-x-8 items-center">
                            <Link
                                to="/"
                                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/login"
                                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
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
