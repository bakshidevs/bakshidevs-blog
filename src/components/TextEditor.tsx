import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useThemeStore from '../store/themeStore.ts';
import useBlogStore, { type BlogType } from '../store/blogStore.ts';
import useAuthStore from '../store/authStore.ts';
import BlogTitleInput from './BlogTitleInput.tsx';
import BlogTagsInput from './BlogTagsInput.tsx';
import ThumbnailUploader from './ThumbnailUploader.tsx';
import EditorActionButtons from './EditorActionButtons.tsx';
import GenerateSlug from './GenerateSlug.tsx';

export default function TextEditor() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const { createBlog, updateBlog, getBlogBySlug, uploadThumbnail, currentBlog } = useBlogStore();
    const { user } = useAuthStore();

    const [blog, setBlog] = useState<Partial<BlogType>>({
        title: '',
        tags: [],
        content: '',
        image: '',
        status: "",
    });
    const blogSlug = blog.title?.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]+/g, '');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        if (slug) {
            getBlogBySlug(slug);
        }
    }, [slug, getBlogBySlug]);

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

    // const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setThumbnailFile(e.target.files[0]);
    //     }
    // };

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

        if (slug) {
            await updateBlog(slug, blogData);
        }
        if (!slug && user && blogSlug) {
            await createBlog(blogSlug, blogData);
        }
        navigate('/profile');
    };

    return (
        <div className="h-full mx-auto relative w-4/5 md:w-3/5">
            <h1 className="font-bold text-3xl mt-6 mb-2">{slug ? 'Edit Post' : 'Create a New Post'}</h1>
            <p className="mb-6">Enrich people with knowledge.</p>
            <div className="mb-16">
                <div className="grid gap-4">
                    <BlogTitleInput value={blog.title!} onChange={handleInputChange} />
                    <GenerateSlug value={blogSlug || ''} />
                    <BlogTagsInput value={blog.tags?.join(', ') || ''} onChange={handleTagsChange} />
                    <ThumbnailUploader thumbnailFile={thumbnailFile} setThumbnailFile={setThumbnailFile} title={blog.title!} />
                </div>
                <MDEditor
                    value={blog.content}
                    onChange={handleContentChange}
                    data-color-mode={theme}
                    style={{ minHeight: '650px'}}
                    previewOptions={{ remarkPlugins: [remarkGfm] }}
                />
            </div>
            <EditorActionButtons onSaveDraft={() => handleSave(true)} onPublish={() => handleSave(false)} isEdit={!!slug} />
        </div>
    );
}
