import { create } from "zustand";
import { persist } from "zustand/middleware";

// importing databases and client from appwrite
import { databases } from "../lib/appwrite";

// importing conf from conf file
import { conf } from "../conf/conf";

interface Blog {
    title: string;
    slug: string;
    content: string;
    category: string;
    tags: string[];
    isPublished: boolean;
    isDraft: boolean;
    isArchived: boolean;
    isFeatured: boolean;
}

type BlogState = {
    blogs: Blog[];
    isLoading: boolean;
}

type BlogActions = {
    createBlog: (blog: Blog) => void;
    updateBlog: (slug: string, updatedBlog: Partial<Blog>) => void;
    deleteBlog: (slug: string) => void;
    setBlogs: (blogs: Blog[]) => void;
}

type BlogStore = BlogState & BlogActions;

const useBlogStore = create<BlogStore>()(
    persist(
        (set) => ({
            blogs: [],
            isLoading: false,
            createBlog: async ({ title, slug, content, isPublished, isDraft }) => {
                set({ isLoading: true });
                try {
                    await databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId,
                        slug,
                        {
                            title,
                            slug,
                            content,
                            isPublished,
                            isDraft,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    )
                } catch (error) {

                }
            },
            updateBlog: (slug, updatedBlog) => set((state) => ({
                blogs: state.blogs.map((blog) =>
                    blog.slug === slug ? { ...blog, ...updatedBlog } : blog
                )
            })),
            deleteBlog: (slug) => set((state) => ({
                blogs: state.blogs.filter((blog) => blog.slug !== slug)
            })),
            setBlogs: (blogs) => set({ blogs })
        }),
        {
            name: "blog-storage",
        }
    )
);

export default useBlogStore;