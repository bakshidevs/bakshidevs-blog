
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

export default function AdminOnly() {
    const { user, isAuthenticated } = useAuthStore();

    return isAuthenticated && user?.labels.includes("admin") ? <Outlet /> : <Navigate to="/" />;
}
