import { create } from "zustand";
import { persist } from "zustand/middleware";
import { databases, storage, ID } from "../lib/appwrite";
import { conf } from "../conf/conf";
import { Query } from "appwrite";

export interface BlogType {
    $id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    tags: string[];
    author: string;
    isPublished: boolean;
    isFeatured: boolean;
    isDraft: boolean;
    createdAt?: string;
    readingTime: string;
    updatedAt?: string;
    isArchived: boolean;
}

type BlogState = {
    blogs: BlogType[];
    currentBlog: BlogType | null;
    isLoading: boolean;
}

type BlogActions = {
    uploadThumbnail: (file: File) => Promise<string | undefined>;
    createBlog: (blog: Partial<BlogType>) => Promise<void>;
    updateBlog: (blogId: string, blog: Partial<BlogType>) => Promise<void>;
    getBlogById: (blogId: string) => Promise<void>;
    getBlogsByAuthor: (authorId: string) => Promise<void>;
}

type BlogStore = BlogState & BlogActions;

const useBlogStore = create<BlogStore>()(
    persist(
        (set) => ({
            blogs: [],
            currentBlog: null,
            isLoading: false,
            uploadThumbnail: async (file: File) => {
                try {
                    const response = await storage.createFile(conf.appwriteBucketId, ID.unique(), file);
                    const fileId = response.$id;
                    const previewUrl = storage.getFilePreview(conf.appwriteBucketId, fileId);
                    return previewUrl.toString();
                } catch (error) {
                    console.error("Upload failed :: Appwrite :: ", error);
                }
            },
            createBlog: async (blog) => {
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
            getBlogById: async (blogId) => {
                set({ isLoading: true });
                try {
                    const response = await databases.getDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteBlogsCollectionId,
                        blogId
                    );
                    if (response) {
                        set({ currentBlog: response as any });
                    } else {
                        set({ currentBlog: null });
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
                        set({ blogs: response.documents as any });
                    } else {
                        set({ blogs: [] });
                    }
                } catch (error) {
                    console.error("Fetching user blogs failed :: Appwrite :: ", error);
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