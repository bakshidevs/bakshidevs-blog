import { Link } from "react-router";
import BlogCard from "../components/BlogCard.tsx";
import useBlogStore from "../store/blogStore.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";


export default function AllBlogs() {

    const { blogs } = useBlogStore();
    const allBlogs = blogs.filter(blog => blog.status === "published");

    return blogs.length > 0 ?
        <div className="mb-12">
            <div className="w-full my-8 flex flex-col items-center justify-center h-64 border rounded border-accent bg-accent/10">
                <div className="w-4/5 md:w-2/3 text-center">
                    <h1 className="font-bold text-accent text-3xl my-1">Tech Blogs</h1>
                    <p className="text-base">Insights, tutorials, and discussions on web development, programming, and technology.</p>
                </div>
            </div>
            <div className="w-4/5 md:w-3/4 xl:w-2/3 mx-auto grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-4">
                {allBlogs.map((blog) => (
                    <Link key={blog.slug} to={`/blog/${blog.slug}`}>
                        <BlogCard blog={blog} />
                    </Link>
                ))}
            </div>
        </div> : <LoadingScreen />
}
