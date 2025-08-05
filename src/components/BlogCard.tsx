import Tags from "./ui/Tags.tsx"
import type { BlogType } from "../store/blogStore.ts"
import { Calendar, Clock, User } from "lucide-react"

export default function BlogCard({ blog }: { blog: BlogType }) {

    return (
        <div className="group rounded-md w-auto h-full overflow-hidden transition-all duration-300 border border-accent bg-accent/10 hover:shadow-2xl hover:-translate-y-1">
            <div className="overflow-hidden">
                <img
                    className="rounded-t-md max-h-64 aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105 overflow-hidden"
                    src={blog.image}
                    alt={blog.slug}
                />
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                    {blog.tags.map((tag, index) => (
                        <Tags key={index} tag={tag} />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
                {blog.username && (
                    <p className="font-medium text-sm flex gap-1 items-center my-1 text-secondary/60 dark:text-primary/60"><User className="h-4 w-4"/> @{blog.username}</p>
                )}
                <p className="text-sm text-secondary/60 dark:text-primary mt-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                    {blog.createdAt && <span className="text-xs text-secondary/60 dark:text-primary flex gap-1 items-center"><Calendar className="h-4 w-4" /> {new Date(blog.createdAt).toLocaleDateString()}</span>}
                    <span className="text-xs text-secondary/60 dark:text-primary flex gap-1 items-center"> <Clock className="h-4 w-4" /> {blog.readingTime} min read</span>
                </div>
            </div>
        </div>
    )
}
