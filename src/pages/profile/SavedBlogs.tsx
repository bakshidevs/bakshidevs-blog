import useAuthStore from "../../store/authStore";
import BlogList from "./BlogList";

export default function SavedBlogs() {
    const { user } = useAuthStore();
    return user?.prefs.savedBlogs ? (
        <BlogList blogs={user?.prefs.savedBlogs} title="Saved Blogs" />
    ) : (
        <div className="h-full w-full flex justify-center items-center">
            <h1>No saved blogs yet...</h1>
        </div>
    )
}