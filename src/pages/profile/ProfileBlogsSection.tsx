
import { Link, Outlet, useLocation } from 'react-router'
import useAuthStore from '../../store/authStore';
import useBlogStore from '../../store/blogStore';
import { useEffect } from 'react';

export default function ProfileBlogsSection() {
    const location = useLocation();
    const { user } = useAuthStore();
    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "border-accent text-accent"
            : "border-transparent text-secondary/70 dark:text-primary/50 hover:text-secondary dark:hover:text-primary";
    };
    const { getBlogsByAuthor } = useBlogStore();
    useEffect(() => {
        if (user) {
            getBlogsByAuthor(user.$id);
        }
    }, [user, getBlogsByAuthor])
    return (
        <div className="w-full max-w-5xl">
            <div className="flex justify-center gap-8 border-b border-secondary/20 dark:border-primary/20 mb-8">
                {user?.labels.includes("admin") && (
                    <>
                        <Link to="/profile/posted" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/posted")}`}>
                            Posted
                        </Link>
                        <Link to="/profile/drafts" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/drafts")}`}>
                            Drafts
                        </Link>
                    </>
                )}
                <Link to="/profile/saved" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/saved")}`}>
                    Saved
                </Link>
            </div>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}
