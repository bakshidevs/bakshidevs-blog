
import { LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";
import { Link, Outlet, useLocation } from "react-router";
import defaultProfile from "../assets/defaultProfile.jpg";

export default function Profile() {
    const { user, logout } = useAuthStore();
    const location = useLocation();

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "border-accent text-accent"
            : "border-transparent text-secondary/70 dark:text-primary/50 hover:text-secondary dark:hover:text-primary";
    };

    return (
        <div className="flex flex-col items-center w-full gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent">
                    <img src={user?.prefs.profilePicture || defaultProfile} alt="profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-lg text-secondary/70 dark:text-primary/50">{user?.email}</p>
                    {!user?.emailVerification && <p className="text-red-500 text-sm mt-1">(Unverified)</p>}
                </div>
                 <button onClick={logout} className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-4 md:mt-0 md:ml-auto">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
            <div className="w-full max-w-5xl">
                <div className="flex justify-center gap-8 border-b border-secondary/20 dark:border-primary/20 mb-8">
                    <Link to="/profile/posted" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/posted")}`}>
                        Posted
                    </Link>
                    <Link to="/profile/drafts" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/drafts")}`}>
                        Drafts
                    </Link>
                </div>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
