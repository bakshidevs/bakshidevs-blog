import { Link } from "react-router";
import BlogCard from "../components/BlogCard";

export type BlogType = {
    title: string;
    createdAt: string; // ideally this could be Date, but you’re using string format
    author: string;
    excerpt: string;
    tags: string[];
    slug: string;
    image: string;
    content: string;
    readingTime: string;
    isFeatured: boolean;
    isPublished: boolean;
    isDraft: boolean;
    isArchived: boolean;
};

export default function AllBlogs() {


    const blogs: BlogType[] = [
        {
            title: "React: A JavaScript Library for Building User Interfaces",
            createdAt: "06/07/2025",
            author: "Bakshidevs",
            excerpt: "React makes UI development simple with components and virtual DOM.",
            tags: ["JavaScript", "React", "Web Development"],
            slug: "react-js-library",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "React is a JavaScript library for building user interfaces...",
            readingTime: "5 min read",
            isFeatured: true,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Mastering JavaScript Closures",
            createdAt: "04/07/2025",
            author: "Bakshidevs",
            excerpt: "Understand how closures help functions access outer scopes.",
            tags: ["JavaScript", "Closures", "Functional Programming"],
            slug: "mastering-js-closures",
            image: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "Closures are a core concept in JavaScript...",
            readingTime: "4 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Why You Should Use Tailwind CSS",
            createdAt: "01/07/2025",
            author: "Bakshidevs",
            excerpt: "Tailwind CSS offers utility-first styling for rapid UI dev.",
            tags: ["CSS", "Tailwind", "UI Design"],
            slug: "why-use-tailwind-css",
            image: "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "Tailwind is a utility-first CSS framework...",
            readingTime: "6 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Demystifying useEffect in React",
            createdAt: "29/06/2025",
            author: "Bakshidevs",
            excerpt: "Learn how useEffect runs side-effects in React apps.",
            tags: ["React", "Hooks", "Web Development"],
            slug: "react-useeffect-guide",
            image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?q=80&w=1427&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "useEffect is used to handle side-effects in React...",
            readingTime: "5 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Getting Started with Zustand",
            createdAt: "25/06/2025",
            author: "Bakshidevs",
            excerpt: "Zustand is a small, fast state manager for React apps.",
            tags: ["React", "Zustand", "State Management"],
            slug: "zustand-state-manager",
            image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1170&auto=format&fit=crop",
            content: "Zustand simplifies state management in React apps...",
            readingTime: "3 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "A Guide to React Router v6",
            createdAt: "22/06/2025",
            author: "Bakshidevs",
            excerpt: "Navigate React apps with ease using React Router v6.",
            tags: ["React", "Routing", "React Router"],
            slug: "react-router-v6-guide",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1170&auto=format&fit=crop",
            content: "React Router v6 simplifies route definitions and nesting...",
            readingTime: "6 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "TypeScript for React Developers",
            createdAt: "20/06/2025",
            author: "Bakshidevs",
            excerpt: "Add type safety to React apps using TypeScript basics.",
            tags: ["TypeScript", "React", "Type Safety"],
            slug: "typescript-for-react",
            image: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "TypeScript helps catch errors early and document intent...",
            readingTime: "7 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Building Forms with React Hook Form",
            createdAt: "18/06/2025",
            author: "Bakshidevs",
            excerpt: "Create performant, flexible forms using React Hook Form.",
            tags: ["React", "Forms", "React Hook Form"],
            slug: "react-hook-form-guide",
            image: "https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "React Hook Form reduces boilerplate and improves form UX...",
            readingTime: "5 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Optimizing React App Performance",
            createdAt: "15/06/2025",
            author: "Bakshidevs",
            excerpt: "Tips to improve performance in your React applications.",
            tags: ["React", "Performance", "Optimization"],
            slug: "react-performance-tips",
            image: "https://images.unsplash.com/photo-1670057037226-b3d65909424f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: "Learn how to reduce re-renders, lazy load and use memo...",
            readingTime: "6 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        },
        {
            title: "Understanding the Virtual DOM",
            createdAt: "13/06/2025",
            author: "Bakshidevs",
            excerpt: "Explore how the virtual DOM improves UI efficiency.",
            tags: ["React", "Virtual DOM", "JavaScript"],
            slug: "virtual-dom-explained",
            image: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?q=80&w=1170&auto=format&fit=crop",
            content: "The virtual DOM is a lightweight copy of the real DOM...",
            readingTime: "5 min read",
            isFeatured: false,
            isPublished: true,
            isDraft: false,
            isArchived: false,
        }
    ];

    return (
        <div>
            <div className="w-full flex flex-col items-center justify-center h-64 border rounded border-accent bg-accent/10">
                <h1 className="font-bold text-accent text-3xl my-1">Tech Blogs</h1>
                <p className="text-base">Insights, tutorials, and discussions on web development, programming, and technology.</p>
            </div>
            <div className="flex gap-4 flex-wrap my-6 justify-center p-12">
                {blogs.map((blog, index) => (
                    <Link to={`/blog/${blog.slug}`}>
                        <BlogCard key={index} blog={blog} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
