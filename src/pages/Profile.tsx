
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
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        {user?.name} {!user?.emailVerification ? <p className="text-red-500 text-sm mt-1">(Unverified)</p> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="h-4 w-4 text-green-500 "><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>}
                    </h1>
                    {user?.prefs?.username && (
                        <p className="text-lg text-secondary/70 dark:text-accent font-medium">@{user?.prefs.username}</p>
                    )}
                    <p className="text-lg text-secondary/70 dark:text-primary/50">{user?.email}</p>
                    
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
