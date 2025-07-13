import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import useThemeStore from '../store/themeStore.ts';
import useBlogStore from '../store/blogStore.ts';
import useAuthStore from '../store/authStore.ts';
import useMDEditorStore from '../store/editorStore.ts';

interface EditorBlogDraft {
    title: string;
    slug: string;
    tags: string[];
    content: any;
}

// #TODO: Figure out a way to fix this page styling along with the Markdown editor or find replacement

export default function TextEditor() {
    const [blog, setBlog] = useState<EditorBlogDraft>({
        title: "",
        slug: "",
        tags: [""],
        content: ""
    })
    function getExcerpt(text: string | undefined): string {
        // Match sentence endings: ., ?, or ! followed by a space or end of string
        const sentences = text?.match(/[^.!?]+[.!?]+(\s|$)/g);
        if (!sentences) return "";

        // Join the first two sentences
        return sentences.slice(0, 2).join("").trim();
    }
    const { theme } = useThemeStore()
    const { createBlog } = useBlogStore();
    const { user } = useAuthStore()
    const { editorValue, setEditorValue } = useMDEditorStore();
    const handleCreateBlog = () => {
        try {
            createBlog({
                title: blog.title,
                createdAt: Date.now(),
                author: user?.name,
                excerpt: getExcerpt(editorValue),
                tags: blog.tags,
                slug: blog.slug,
                content: editorValue,
                readingTime: "5 mins",
                isArchived: false,
                isFeatured: false,
                isDraft: false,
                isPublished: true,
            })
        } catch (error) {

        }
    }
    return (
        <div className="h-full relative">
            <h1 className="font-bold text-3xl mt-6 mb-2">Create a New Post</h1>
            <p className="mb-6">Enrich people with knowledge.</p>
            <MDEditor
                value={editorValue}
                onChange={setEditorValue}
                style={{
                    minHeight: "600px",
                    backgroundColor: theme === "light" ? "transparent" : "#0d1117",
                    color: theme === "light" ? "#000" : "#B4637A",
                    // color: "#FAF4ED"
                }}
                previewOptions={{
                    remarkPlugins: [remarkGfm],
                    style: {
                        backgroundColor: theme === "light" ? "#f1f1f1" : "#0d1117",
                        color: theme === "light" ? "#c1c1c1" : "#B4637A",
                    }
                }}
            />
            <div className="h-100 bg-accent/10 w-full"></div>
            <div className="flex gap-4 font-medium fixed bottom-12 right-8">
                <button className="hover:bg-olive/80 bg-olive active:scale-105 transition-all duration-200 px-2 py-1 rounded-md">Save to Drafts</button>
                <button className="px-2 py-1 rounded-md bg-accent hover:bg-accent/80 active:scale-105 transition-all duration-200">Post</button>
            </div>
        </div>
    )
}
