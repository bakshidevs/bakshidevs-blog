import { Navigate } from "react-router";

import type React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user: boolean = false;
    return (
        user ? { children } : <Navigate to="/login" replace={true} />
    )
}
