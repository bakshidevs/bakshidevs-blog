import BlogList from "./BlogList";
import useAuthStore from "../../store/authStore";

export default function DraftBlogs() {
    const { user } = useAuthStore();
    return user?.prefs.draftedBlogs ? (
        <BlogList blogs={user?.prefs.draftedBlogs} title="Drafts" />
    ) : (
        <div className="h-full w-full flex justify-center items-center">
            <h1>No drafted blogs yet...</h1>
        </div>
    )
}