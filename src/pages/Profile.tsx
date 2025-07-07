
import { Coffee, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore"
export default function Profile() {
    const { user, logout } = useAuthStore();
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-4 ">
            <div className="border border-olive dark:border-accent p-4 rounded-md bg-secondary/10 dark:bg-primary/10 shadow-lg">
                <Coffee />
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-secondary/70 dark:text-primary/50">Welcome, {user?.name}!</p>
                <p className="text-secondary/70 dark:text-primary/50">Email: {user?.email}</p>
                <p className="text-secondary/70 dark:text-primary/50">Labels: {user?.labels.join(", ")}</p>
                <button className="flex text-xl items-center gap-1 bg-accent text-primary p-1 w-full justify-center rounded-md hover:bg-accent/80 transition-colors mt-2`">
                    Logout <LogOut className="w-4 h-4" onClick={logout} />
                </button>
            </div>
        </div>
    )
}
