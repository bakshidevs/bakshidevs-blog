import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router';
import useThemeStore from '../store/themeStore.ts';

// Text editor components
import BlogTitleInput from './BlogTitleInput.tsx';
import BlogTagsInput from './BlogTagsInput.tsx';
import ThumbnailUploader from './ThumbnailUploader.tsx';
import EditorActionButtons from './EditorActionButtons.tsx';
import GenerateSlug from './GenerateSlug.tsx';
import useEditorStore from '../store/editorStore.ts';
import BlogExcerpt from './BlogExcerpt.tsx';
import { useEffect } from 'react';



export default function TextEditor() {
    const { editorValue, setEditorValue, resetValue } = useEditorStore();
    const { slug } = useParams<{ slug: string }>();
    const { theme } = useThemeStore();


    // resets the editor value on component unmount (only when something was being edited)
    useEffect(() => {
        if (slug) {
            return () => {
                resetValue();
            }
        }
    }, [resetValue, slug])

    return (
        <div className="h-full mx-auto relative w-4/5 md:w-3/5">
            <h1 className="font-bold text-3xl mt-6 mb-2">{slug ? 'Edit Post' : 'Create a New Post'}</h1>
            <p className="mb-6">Enrich people with knowledge.</p>
            <div className="mb-16">
                <div className="grid gap-4">
                    <BlogTitleInput />
                    <GenerateSlug />
                    <BlogTagsInput />
                    <BlogExcerpt />
                    <ThumbnailUploader />
                </div>
                <MDEditor
                    value={editorValue}
                    onChange={setEditorValue}
                    data-color-mode={theme}
                    style={{ minHeight: '650px' }}
                    previewOptions={{ remarkPlugins: [remarkGfm] }}
                    preview="edit"
                />
            </div>
            <EditorActionButtons />
        </div>
    );
}
