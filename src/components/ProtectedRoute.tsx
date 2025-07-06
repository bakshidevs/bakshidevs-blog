import { Navigate } from "react-router";

import type React from "react";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return (
        <>{children}</>
    )
}
