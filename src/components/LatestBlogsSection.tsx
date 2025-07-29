import { Link } from "react-router"
import BlogCard from "./BlogCard.tsx"
import useBlogStore from "../store/blogStore.ts"
import LoadingScreen from "./LoadingScreen.tsx";

export default function LatestBlogsSection() {
    const { publishedBlogs } = useBlogStore();

    return publishedBlogs.length > 0 ? (
        <section aria-label="popular-blogs">
            <div className="flex justify-between items-center text-accent py-3">
                <h2 className="font-bold text-2xl">Latest Blogs</h2>
                <Link to="/blogs">
                    <button className="px-2 py-1 bg-primary hover:bg-accent hover:text-primary transition-all duration-300 font-medium rounded-md">View All</button>
                </Link>
            </div>
            <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-3">
                {publishedBlogs.slice(1, 5).map((blog) => (
                        <Link key={blog.slug} to={`/blog/${blog.slug}`}>
                            <BlogCard blog={blog} />
                        </Link>
                ))}
            </div>
        </section>
    ) : <LoadingScreen />
}
