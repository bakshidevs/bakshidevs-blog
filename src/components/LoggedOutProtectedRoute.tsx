import { Outlet, Navigate } from "react-router";
import useAuthStore from "../store/authStore";

export default function LoggedOutProtectedRoute() {
    const { isAuthenticated } = useAuthStore();
    return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" replace />
}
