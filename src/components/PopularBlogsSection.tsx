import { allBlogs } from "../pages/AllBlogs.tsx"
import BlogCard from "./BlogCard.tsx"

export default function PopularBlogsSection() {
    return (
        <section aria-label="popular-blogs">
            <div className="flex justify-between items-center text-accent py-2">
                <h1 className="font-bold text-2xl">Popular Blogs</h1>
                <button className="px-2 py-1 bg-primary hover:bg-accent hover:text-primary transition-all duration-300 font-medium rounded-md">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 styled-scrollbar">
                {allBlogs.slice(1, 8).map((blog) => (
                    <div key={blog.slug} className="flex-none snap-center">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>

        </section>
    )
}
