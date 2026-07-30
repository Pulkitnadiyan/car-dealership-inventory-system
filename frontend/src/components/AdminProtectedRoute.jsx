import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../utils/jwt";

function AdminProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const decoded = decodeToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminProtectedRoute;
