import BlogList from "./BlogList";
import { type BlogType } from "../../store/blogStore";
// Mock data for demonstration
const mockBlogs : BlogType[] = [
    {
        title: "My First Blog Post",
        createdAt: "10/07/2024",
        author: "Bakshidevs",
        excerpt: "This is my very first blog post on this platform. Exciting times!",
        tags: ["Welcome", "First Post"],
        slug: "my-first-blog-post",
        image: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "Content for my first blog post...",
        readingTime: 2,
        isFeatured: false,
        status: "published",
        isArchived: false,
    },
    {
        title: "A Deep Dive into Web Development",
        createdAt: "15/07/2024",
        author: "Bakshidevs",
        excerpt: "Exploring the intricacies of modern web development frameworks and tools.",
        tags: ["Web Development", "Frontend", "Backend"],
        slug: "deep-dive-web-dev",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "Content for deep dive into web development...",
        readingTime: 7,
        isFeatured: true,
        status: "published",
        isArchived: false,
    },
];

export default function PostedBlogs() {
    return <BlogList blogs={mockBlogs} title="Posted Blogs" />;
}