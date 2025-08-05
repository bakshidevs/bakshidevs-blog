
import { Link } from "react-router"
import useBlogStore, { type ReturnedBlogType } from "../store/blogStore"
import Tags from "./ui/Tags"
import useViewport from "../hooks/useViewport"
import { latestBlogs } from "../lib/blogUtils"
import { Calendar, Clock } from "lucide-react"

export default function FeaturedPost() {

    //
    const { publishedBlogs } = useBlogStore();

    // featuring the blog with most reading time in last seven days
    function getFeaturedPost(blogs: ReturnedBlogType[]) {
        if (blogs.length === 0) return null;

        return blogs.reduce((maxBlog, currentBlog) => {
            return currentBlog.readingTime > maxBlog.readingTime ? currentBlog : maxBlog;
        });
    }
    const recentBlogs: ReturnedBlogType[] = latestBlogs(publishedBlogs as ReturnedBlogType[]);
    const featuredPost = getFeaturedPost(recentBlogs)!;
    const { isMobile } = useViewport();
    return featuredPost ? (
        <Link to={`blog/${featuredPost.slug}`}>
            <section aria-label="featured-post" className="h-64 md:h-80 relative mx-auto rounded-md my-12 shadow-2xl hover:shadow-base dark:shadow-accent/50 dark:hover:shadow-accent hover:scale-101 duration-500">
                {featuredPost.image && (<img className="h-full w-full object-cover rounded-md" src={featuredPost.image} alt={featuredPost.slug} />)}
                <div className="group absolute inset-0 bg-black/20 dark:bg-black/40 hover:bg-black/70 text transition-all duration-500 top-0 rounded-md">
                    <div className="absolute bottom-0 p-6 text-primary">
                        <h2 className="text-xl md:text-4xl group-hover:underline font-bold my-1">{featuredPost.title}</h2>
                        <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {featuredPost.tags.map((tag, index) => (
                                <Tags key={index} tag={tag} />
                            ))}
                        </div>
                        <p className="text-sm">{isMobile ? featuredPost.excerpt.slice(0, 75).trim() + "..." : featuredPost.excerpt}</p>
                        <div className="flex gap-2 items-center mt-2 text-xs">
                            {featuredPost.createdAt && <span className="text-xs text-secondary/60 dark:text-primary flex gap-1 items-center"><Calendar className="h-4 w-4" /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>}
                            <div className="h-1 w-1 bg-primary rounded-full"></div>
                            <span className="text-xs text-secondary/60 dark:text-primary flex gap-1 items-center"> <Clock className="h-4 w-4" /> {featuredPost.readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </section >
        </Link>
    ) : null
}
