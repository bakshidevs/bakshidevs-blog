import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
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
    const { theme, isDarkModeEnabled } = useThemeStore()
    const { createBlog } = useBlogStore();
    const { user } = useAuthStore()
    const { blogTitle, setBlogTitle, editorValue, setEditorValue } = useMDEditorStore();
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
    const slug = blogTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    return (
        <div className="h-full w-9/10 mx-auto relative">
            <h1 className="font-bold text-3xl mt-6 mb-2">Create a New Post</h1>
            <p className="mb-6">Enrich people with knowledge.</p>
            <div className="mb-16">
                <div className="grid gap-2">
                    <input
                        className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        aria-label="blog-title-input"
                        type="text"
                        name="Blog-Title"
                        placeholder="Enter your blog title..."
                    />
                    <input
                        value={slug}
                        className="bg-accent/10 p-3 rounded-md"
                        type="text"
                        disabled
                    />
                    <input className="bg-accent/10 p-3 rounded-md cursor-pointer" placeholder='add your thumbnail' type="file" name="thumbnail" />
                </div>
                <MDEditor
                    value={editorValue}
                    onChange={setEditorValue}
                    data-color-mode={theme}
                    components={{}}
                    style={{
                        minHeight: "650px",
                        color: isDarkModeEnabled ? "#B4637A " : "",
                    }}
                    previewOptions={{
                        remarkPlugins: [remarkGfm],
                        style: {

                            color: isDarkModeEnabled ? "#B4637A " : ""
                        }
                    }}
                />
                <div className="grid">
                    <h1 className="font-bold text-4xl text-[#c9d1d9] my-4">{blogTitle}</h1>
                    <hr className='h-0.5 text-[#c9d1d9] mb-2' />
                    <MDEditor.Markdown
                        wrapperElement={{
                            'data-color-mode': isDarkModeEnabled ? "dark" : "light",
                        }}
                        source={editorValue}
                    />
                </div>
            </div>
            <div className="flex gap-4 font-medium absolute bottom-12 right-8">
                <button className="hover:bg-olive/80 bg-olive active:scale-105 transition-all duration-200 px-2 py-1 rounded-md">Save to Drafts</button>
                <button onClick={handleCreateBlog} className="px-2 py-1 rounded-md bg-accent hover:bg-accent/80 active:scale-105 transition-all duration-200">Post</button>
            </div>
        </div>
    )
}
