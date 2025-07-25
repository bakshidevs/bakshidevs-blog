import BlogList from "./BlogList";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router";

export default function PostedBlogs() {
    const { user } = useAuthStore();
    return user?.prefs.draftedBlogs ? (
        <BlogList blogs={user?.prefs.draftedBlogs} title="Drafts" />
    ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-medium">No posted blogs yet...</h1>
            <Link className="text-olive p-1" to="/write">Write a new blog!</Link>
        </div>
    )
}