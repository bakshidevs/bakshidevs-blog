import Tags from "./ui/Tags"
import LoadingScreen from "./LoadingScreen"
import { useEffect, useState } from "react"

export default function BlogCard() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    const blog = {
        tite: "React: A JavaScript Library for Building User Interfaces",
        createdAt: "06/07/2025",
        author: "Bakshidevs",
        excerpt: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. React's virtual DOM and component-based architecture make it a popular choice for modern web development.",
        tags: ["JavaScript", "React", "Web Development"],
        slug: "react-js-library",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. React's virtual DOM and component-based architecture make it a popular choice for modern web development.",
        readingTime: "5 min read",
        isFeatured: true,
        isPublished: true,
        isDraft: false,
        isArchived: false,
    }

    if (loading) return <LoadingScreen />

    return (
        <div className="group rounded-md w-84 overflow-hidden transition border border-secondary/20 bg-primary/10">
            <div className="overflow-hidden">
                <img
                className="rounded-t-md transition-transform duration-500 group-hover:scale-105 overflow-hidden"
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
                <h2 className="text-2xl font-bold mt-4">{blog.tite}</h2>
                <p className="text-sm text-secondary/60 dark:text-primary mt-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-secondary/60 dark:text-primary">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs text-secondary/60 dark:text-primary">{blog.readingTime}</span>
                </div>
            </div>
        </div>
    )
}
