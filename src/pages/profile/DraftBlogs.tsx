import BlogList from "./BlogList";
import { Link } from "react-router";
import useBlogStore from "../../store/blogStore";

export default function DraftBlogs() {
    const { draftedByAuthor } = useBlogStore();
    
    return draftedByAuthor.length > 0 ? (
        <BlogList blogs={draftedByAuthor} title="Drafts" />
    ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-medium">No drafted blogs yet...</h1>
            <Link className="text-olive p-1" to="/write">Write a new blog!</Link>
        </div>
    )
}