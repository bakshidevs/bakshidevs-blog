import BlogList from "./BlogList";
import { Link } from "react-router";
import useBlogStore from "../../store/blogStore";

export default function PostedBlogs() {
    const { publishedByAuthor } = useBlogStore();
    
    return publishedByAuthor.length > 0 ? (
        <BlogList blogs={publishedByAuthor} title="Posted Blogs" />
    ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-xl font-medium">No posted blogs yet...</h1>
            <Link className="text-olive p-1" to="/write">Write a new blog!</Link>
        </div>
    )
}