import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm';
import { useParams, useNavigate } from 'react-router';
import useThemeStore from '../store/themeStore.ts';
import BlogTitleInput from './BlogTitleInput.tsx';
import BlogTagsInput from './BlogTagsInput.tsx';
import ThumbnailUploader from './ThumbnailUploader.tsx';
import EditorActionButtons from './EditorActionButtons.tsx';
import GenerateSlug from './GenerateSlug.tsx';
import useEditorStore from '../store/editorStore.ts';
import BlogExcerpt from './BlogExcerpt.tsx';



export default function TextEditor() {
    const { editorValue, setEditorValue } = useEditorStore();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { theme } = useThemeStore();


    const handleSave = async (isDraft: boolean) => {

        console.log(isDraft);
        navigate('/profile');
    };

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
                    preview='edit'
                />
            </div>
            <EditorActionButtons onSaveDraft={() => handleSave(true)} isEdit={!!slug} />
        </div>
    );
}
