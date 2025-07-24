import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useThemeStore from '../store/themeStore.ts';
import useBlogStore, { type BlogType } from '../store/blogStore.ts';
import useAuthStore from '../store/authStore.ts';
import { UploadCloud, X } from 'lucide-react';

export default function TextEditor() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const { createBlog, updateBlog, getBlogById, uploadThumbnail, currentBlog } = useBlogStore();
    const { user } = useAuthStore();

    const [blog, setBlog] = useState<Partial<BlogType>>({
        title: '',
        tags: [],
        content: '',
        image: '',
        status: "",
    });
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        if (slug) {
            getBlogById(slug);
        }
    }, [slug, getBlogById]);

    useEffect(() => {
        if (currentBlog && slug) {
            setBlog(currentBlog);
        }
    }, [currentBlog, slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBlog((prev) => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
    };

    const handleContentChange = (value?: string) => {
        setBlog((prev) => ({ ...prev, content: value }));
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSave = async (isDraft: boolean) => {
        let thumbnailUrl = blog.image;
        if (thumbnailFile) {
            thumbnailUrl = await uploadThumbnail(thumbnailFile);
        }

        const blogData = {
            ...blog,
            thumbnail: thumbnailUrl,
            author: user?.$id,
            isPublished: !isDraft,
            isDraft,
        };

        // if (slug) {
        //     await updateBlog(slug, blogData);
        // } else {
        //     await createBlog(slug, blogData);
        // }
        navigate('/profile');
    };

    return (
        <div className="h-full w-9/10 mx-auto relative">
            <h1 className="font-bold text-3xl mt-6 mb-2">{slug ? 'Edit Post' : 'Create a New Post'}</h1>
            <p className="mb-6">Enrich people with knowledge.</p>
            <div className="mb-16">
                <div className="grid gap-4">
                    <input
                        className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
                        value={blog.title}
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Enter your blog title..."
                    />
                    <input
                        className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
                        value={blog.tags?.join(', ')}
                        onChange={handleTagsChange}
                        name="tags"
                        placeholder="Tags (comma-separated)..."
                    />
                    <div className="bg-accent/10 mb-3 rounded-md flex justify-center items-center p-4">
                        {thumbnailFile ? (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(thumbnailFile)}
                                    alt={blog.title}
                                />
                                <button className="absolute top-0 right-0 bg-red-500 rounded-md" onClick={() => setThumbnailFile(null)}>
                                    <X />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="blog-thumbnail" className="rounded-md border-2 border-dotted border-accent flex flex-col items-center p-8 cursor-pointer">
                                <UploadCloud />
                                <p className="text-accent font-semibold">Click to browse or drag & drop</p>
                                <p className="text-sm text-secondary/50 dark:text-primary/50">PNG, JPG, GIF</p>
                                <input id="blog-thumbnail" className="hidden" type="file" onChange={handleThumbnailChange} />
                            </label>
                        )}
                    </div>
                </div>
                <MDEditor
                    value={blog.content}
                    onChange={handleContentChange}
                    data-color-mode={theme}
                    style={{ minHeight: '650px' }}
                    previewOptions={{ remarkPlugins: [remarkGfm] }}
                />
            </div>
            <div className="flex gap-4 font-medium fixed bottom-24 right-8">
                <button
                    className="bg-olive active:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-olive/80"
                    onClick={() => handleSave(true)}
                >
                    Save to Drafts
                </button>
                <button
                    onClick={() => handleSave(false)}
                    className="px-2 py-1 rounded-md bg-accent active:scale-105 transition-all duration-200 hover:bg-accent/80"
                >
                    {slug ? 'Update Blog' : 'Publish Blog'}
                </button>
            </div>
        </div>
    );
}
