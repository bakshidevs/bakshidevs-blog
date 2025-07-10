
import { NotebookPen } from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "../store/authStore.ts";
import FeaturedPost from "../components/FeaturedPost.tsx";
import { allBlogs } from "./AllBlogs.tsx";
import PopularBlogsSection from "../components/PopularBlogsSection.tsx";

export default function Index() {
    const { isAuthenticated, user } = useAuthStore();
    const post = allBlogs[0]
    return (
        <div className="h-full mx-auto my-12 w-[90vw] sm:w-[80vw] md:w-[60vw]">
            <FeaturedPost
                featuredPost={post}
            />
            <PopularBlogsSection />
            {isAuthenticated && user?.labels[0] === "admin" && (
                <Link to="/write" className="fixed bottom-12 right-12 p-3 hover:bg-accent/60 rounded-full bg-accent transition-colors">
                    <NotebookPen />
                </Link>
            )}
        </div>
    )
}
