import Tags from "./ui/Tags.tsx"
import type { BlogType } from "../store/blogStore.ts"

export default function BlogCard({ blog }: { blog: BlogType }) {



    return (
        <div className="group rounded-md w-72 md:w-80 overflow-hidden transition-all duration-300 hover:scale-103 border border-accent bg-accent/10 hover:shadow-2xl dark:hover:shadow-accent">
            <div className="overflow-hidden">
                <img
                    className="rounded-t-md max-h-64 aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105 overflow-hidden"
                    src={blog.image}
                    alt=""
                />
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    {blog.tags.map((tag, index) => (
                        <Tags key={index} tag={tag} />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
                <p className="text-sm text-secondary/60 dark:text-primary mt-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                    {blog.createdAt && <span className="text-xs text-secondary/60 dark:text-primary">{new Date(blog.createdAt).toLocaleDateString()}</span>}
                    <span className="text-xs text-secondary/60 dark:text-primary">{blog.readingTime} min read</span>
                </div>
            </div>
        </div>
    )
}
