import { Link } from "react-router";
import BlogCard from "../../components/BlogCard";
import { type BlogType } from "../../store/blogStore";



interface BlogListProps {
    blogs: BlogType[];
    title: string;
}

export default function BlogList({ blogs, title }: BlogListProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-3">
                {blogs.map((blog) => (
                    <div  className="relative">
                        <Link key={blog.$id} to={`/blog/${blog.$id}`}>
                            <BlogCard blog={blog} />
                        </Link>
                        <Link to={`/edit/${blog.slug}`} className="text-md absolute top-2 right-4 text-accent hover: hover:text-primary hover:underline mt-2 inline-block font-bold">Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}