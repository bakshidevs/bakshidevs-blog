
import { NotebookPen } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";

import useAuthStore from "../store/authStore";

export default function Index() {
    const { isAuthenticated } = useAuthStore();
    return (
        <div className="flex relative flex-col items-center justify-center h-full">
            <BlogCard />
            {isAuthenticated && (
                <Link to="/write" className="fixed bottom-16 right-4 p-2 bg-accent/20 dark:bg-secondary/20 rounded-full hover:bg-accent/30 dark:hover:bg-secondary/30 transition-colors">
                    <NotebookPen />
                </Link>
            )}
        </div>
    )
}
