import useBlogStore from "../store/blogStore";
import useEditorStore from "../store/editorStore";
import { type BlogType } from "../store/blogStore";
import useAuthStore from "../store/authStore";
import { useNavigate, useParams } from "react-router";

import { notify } from "./ui/Toast";
import { useEffect } from "react";

export default function EditorActionButtons() {
    const { currentBlog, createBlog, updateBlog, getBlogBySlug } = useBlogStore();
    const { blogTitle, thumbnailURL, slug, tags, excerpt, editorValue, resetValue, setStateValue, setEditorValue } = useEditorStore();
    const { user } = useAuthStore();

    const navigate = useNavigate();

    const params = useParams<{ slug: string }>();
    const editBlogSlug = params.slug;


    // handle creation of a new blog and resets the editor after blog publishing is successful
    const handleCreateBlog = async (status: "draft" | "published") => {
        const blogData: Partial<BlogType> = {
            title: blogTitle,
            slug: slug,
            excerpt: excerpt,
            content: editorValue,
            image: thumbnailURL,
            tags,
            author: user?.$id,
            username: user?.prefs.username,
            status: status,
            isFeatured: false,
            isArchived: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            readingTime: editorValue ? Math.ceil(editorValue.split(' ').length / 200) : 0,
        }
        if (blogData && slug && status === "published") {
            await createBlog(blogData);
            navigate(`/blog/${slug}`);
            resetValue();
        } else if (blogData && slug && status === "draft") {
            await createBlog(blogData);
            navigate(`/profile/drafts`);
            resetValue();
        } else {
            notify.warning("Please fill in all fields.");
        }
    }

    // when user comes to editor for editing an existing blog editor restores the value from the blog
    useEffect(() => {
        if (editBlogSlug) {
            resetValue();
            getBlogBySlug(editBlogSlug);
            if (currentBlog) {
                setStateValue({ name: "blogTitle", value: currentBlog.title });
                setStateValue({ name: "slug", value: currentBlog.slug });
                setStateValue({ name: "excerpt", value: currentBlog.excerpt });
                setStateValue({ name: "tags", value: currentBlog.tags });
                setEditorValue(currentBlog.content);
                setStateValue({ name: "thumbnailURL", value: currentBlog.image });
            }
        }
    }, [editBlogSlug, getBlogBySlug, resetValue, currentBlog, setStateValue, setEditorValue])

    // editor can move the edited blog to draft or published reprised version
    const handleUpdateBlog = async (status: "draft" | "published") => {
        if (editBlogSlug && currentBlog) {
            const blogData: Partial<BlogType> = {
                title: blogTitle,
                slug,
                excerpt,
                content: editorValue,
                tags,
                status: status,
                updatedAt: new Date().toISOString(),
                readingTime: editorValue ? Math.ceil(editorValue.split(' ').length / 200) : 1,
            }
            if (currentBlog.$id) {
                await updateBlog(currentBlog.$id, blogData);
                navigate(`/blog/${slug}`);
                resetValue();
            }
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 font-medium fixed bottom-24 right-16">
            {editBlogSlug ? (
                <>
                    <button
                        className="bg-olive w-full active:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-olive/80"
                        onClick={() => handleUpdateBlog("draft")}
                    >
                        Update & Move to Drafts
                    </button>
                    <button
                        onClick={() => handleUpdateBlog("published")}
                        className="px-2 py-1 w-full rounded-md bg-accent active:scale-105 transition-all duration-200 hover:bg-accent/80"
                    >
                        Update & Publish Blog
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="bg-olive w-full active:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-olive/80"
                        onClick={() => handleCreateBlog("draft")}
                    >
                        Save to Drafts
                    </button>
                    <button
                        onClick={() => handleCreateBlog("published")}
                        className="px-2 py-1 w-full rounded-md bg-accent active:scale-105 transition-all duration-200 hover:bg-accent/80"
                    >
                        Publish Blog
                    </button>
                    <button className="p-1  rounded-md text-xs bg-red-500 active:scale-110 transition-all duration-200 hover:bg-red-600" onClick={resetValue}>
                        Reset Editor!
                    </button>
                </>
            )}
        </div>
    );
}
