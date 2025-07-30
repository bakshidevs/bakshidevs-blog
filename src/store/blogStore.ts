import { create } from "zustand";
import { persist } from "zustand/middleware";
import { databases, storage, ID } from "../lib/appwrite";
import { conf } from "../conf/conf";
import { Query, type Models } from "appwrite";

export interface BlogType {
    $id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    tags: string[];
    author: string;
    username?: string;
    status: "published" | "draft" | "";
    isFeatured: boolean;
    createdAt: string | number | Date;
    readingTime: number;
    updatedAt?: string | number | Date;
    isArchived: boolean;
}

type ReturnedBlogType = BlogType & Models.Document;


type BlogState = {
    blogs: BlogType[];
    publishedBlogs: BlogType[];
    draftedBlogs: BlogType[];
    allBlogsByAuthor: BlogType[];
    publishedByAuthor: BlogType[];
    draftedByAuthor: BlogType[];
    currentBlog: BlogType | null;
    isLoading: boolean;
}

type BlogActions = {
    uploadThumbnail: (file: File) => Promise<string | undefined>;
    createBlog: (blog: Partial<BlogType>) => Promise<void>;
    updateBlog: (blogId: string, blog: Partial<BlogType>) => Promise<void>;
    getBlogBySlug: (blogId: string) => Promise<void>;
    getAllBlogs: () => Promise<void>;
    getBlogsByAuthor: (authorId: string) => Promise<void>;
    deleteBlog: (blogId: string) => Promise<void>;
}

type BlogStore = BlogState & BlogActions;

const useBlogStore = create<BlogStore>()(
    persist(
        (set, get) => ({
            blogs: [],
            publishedBlogs: [],
            draftedBlogs: [],
            allBlogsByAuthor: [],
            publishedByAuthor: [],
            draftedByAuthor: [],
            currentBlog: null,
            isLoading: false,
            uploadThumbnail: async (file: File) => {
                try {
                    const response = await storage.createFile(conf.appwriteBucketId, ID.unique(), file);
                    const fileId = response.$id;
                    const previewUrl = storage.getFileView(conf.appwriteBucketId, fileId);
                    return previewUrl;
                } catch (error) {
                    console.error("Upload failed :: Appwrite :: ", error);
                }
            },
            createBlog: async (blog: Partial<BlogType>) => {
                set({ isLoading: true });
                try {
                    await databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId,
                        ID.unique(),
                        blog
                    );
                } catch (error) {
                    console.error("Blog creation failure :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            updateBlog: async (blogId, blog) => {
                set({ isLoading: true });
                try {
                    await databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId,
                        blogId,
                        blog
                    );
                } catch (error) {
                    console.error("Blog update failure :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            getAllBlogs: async () => {
                set({ isLoading: true });
                try {
                    const response = await databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId
                    );
                    if (response.documents) {
                        const allBlogs = response.documents as ReturnedBlogType[];
                        set({ blogs: allBlogs, publishedBlogs: allBlogs.filter(blog => blog.status === "published"), draftedBlogs: allBlogs.filter(blog => blog.status === "draft") });
                    } else {
                        set({ blogs: [] });
                    }
                } catch (error) {
                    console.error("Fetching all blogs failed :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });

                }
            },
            getBlogBySlug: async (slug: string) => {
                set({ isLoading: true });
                try {
                    // it checks whether the blog is already in the local state
                    const { blogs } = get();
                    const blog = blogs.find(blog => blog.slug === slug);
                    if (blog) {
                        // if it is found, then the currentBlog is updated
                        set({ currentBlog: blog });
                        // otherwise it fetches the blog from the database
                    } else {
                        const response = await databases.listDocuments(
                            conf.appwriteDatabaseId,
                            conf.appwriteBlogsCollectionId,
                            [
                                Query.equal("slug", slug)
                            ]
                        );
                        if (response) {
                            set({ currentBlog: response.documents[0] as ReturnedBlogType });
                        } else {
                            set({ currentBlog: null });
                        }
                    }
                } catch (error) {
                    console.error("Blog fetching failed :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            getBlogsByAuthor: async (authorId) => {
                set({ isLoading: true });
                try {
                    const response = await databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId,
                        [Query.equal("author", authorId)]
                    );
                    if (response.documents) {
                        const authoredBlogs = response.documents as ReturnedBlogType[];
                        set({ allBlogsByAuthor: authoredBlogs, publishedByAuthor: authoredBlogs.filter(blog => blog.status === "published"), draftedByAuthor: authoredBlogs.filter(blog => blog.status === "draft") });
                    } else {
                        set({ allBlogsByAuthor: [], publishedByAuthor: [], draftedByAuthor: [] });
                    }
                } catch (error) {
                    console.error("Fetching user blogs failed :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            deleteBlog: async (blogId) => {
                set({ isLoading: true });
                try {
                    await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteBlogsCollectionId, blogId);
                } catch (error) {
                    console.error("Document deletion failed :: Appwrite :: ", error);
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: "blog-storage",
        }
    )
);

export default useBlogStore;