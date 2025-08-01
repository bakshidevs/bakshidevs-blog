
import { NotebookPen } from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "../store/authStore.ts";
import FeaturedPost from "../components/FeaturedPost.tsx";
import LatestBlogsSection from "../components/LatestBlogsSection.tsx";
import useBlogStore from "../store/blogStore.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";

export default function Index() {
    const { isAuthenticated, user } = useAuthStore();
    const { publishedBlogs, isLoading } = useBlogStore();
    const random = Math.floor(Math.random() * publishedBlogs.length);
    const post = publishedBlogs[random];
    return !isLoading ? (
        <div className="mx-auto my-12 w-[90vw] md:w-[80vw] xl:w-[60vw]">
            {post && (
                <FeaturedPost />
            )}
            <LatestBlogsSection />
            {isAuthenticated && user?.labels[0] === "admin" && (
                <Link to="/write" className="fixed bottom-12 right-12 p-3 hover:bg-accent/60 rounded-full bg-accent transition-colors">
                    <NotebookPen />
                </Link>
            )}
        </div>
    ) : (
        <LoadingScreen />
    )
}
