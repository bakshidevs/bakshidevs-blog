import BlogList from "./BlogList";
import { type BlogType } from "../../store/blogStore";

// Mock data for demonstration
export const mockBlogs : BlogType[] = [
    {
        title: "Draft Blog Post 1",
        createdAt: "01/01/2024",
        author: "Bakshidevs",
        excerpt: "This is a draft blog post about a new technology.",
        tags: ["Technology", "Draft"],
        slug: "draft-blog-1",
        image: "https://images.unsplash.com/photo-1751132901281-82f7fbda1786?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "Content for draft blog post 1...",
        readingTime: "2 min read",
        isFeatured: false,
        isPublished: false,
        isDraft: true,
        isArchived: false,
    },
    {
        title: "Draft Blog Post 2: Ideas for Future",
        createdAt: "05/02/2024",
        author: "Bakshidevs",
        excerpt: "Brainstorming ideas for upcoming articles.",
        tags: ["Ideas", "Planning"],
        slug: "draft-blog-2",
        image: "https://via.placeholder.com/300",
        content: "Content for draft blog post 2...",
        readingTime: "3 min read",
        isFeatured: false,
        isPublished: false,
        isDraft: true,
        isArchived: false,
    },
];

export default function DraftBlogs() {
    return <BlogList blogs={mockBlogs} title="Drafts" />;
}