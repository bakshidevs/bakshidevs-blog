
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";

export default function AdminOnly() {
    const { user } = useAuthStore();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.labels.includes("admin"));
        }
        setIsLoading(false);
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
