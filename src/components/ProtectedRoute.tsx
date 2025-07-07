import { Navigate, Outlet } from "react-router";


import useAuthStore from "../store/authStore";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return (
        <Outlet />
    )
}
