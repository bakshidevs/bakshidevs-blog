import useBlogStore from "../store/blogStore";
import useEditorStore from "../store/editorStore";
import { type BlogType } from "../store/blogStore";
import useAuthStore from "../store/authStore";

export default function EditorActionButtons({
    onSaveDraft,
    isEdit,
}: {
    onSaveDraft: () => void;
    isEdit: boolean;
}) {
    const { createBlog } = useBlogStore();
    const { blogTitle, thumbnailURL, slug, tags, editorValue, resetValue } = useEditorStore();
    const { user } = useAuthStore();

    const handleCreateBlog = async () => {
        const blogData: Partial<BlogType> = {
            title: blogTitle,
            slug: slug,
            excerpt: editorValue?.slice(0, 160) + '...',
            content: editorValue,
            image: thumbnailURL,
            tags,
            author: user?.$id,
            username: user?.prefs.username,
            status: "published",
            isFeatured: false,
            isArchived: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            readingTime: editorValue ? Math.ceil(editorValue.split(' ').length / 200) : 0,
        }
        if (blogData && slug) {
            createBlog(blogData);
        }
    }

    return (
        <div className="flex flex-col gap-4 font-medium fixed bottom-24 right-16">
            <button className="" onClick={resetValue}>
                Reset Editor!
            </button>
            <button
                className="bg-olive active:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-olive/80"
                onClick={onSaveDraft}
            >
                Save to Drafts
            </button>
            <button
                onClick={handleCreateBlog}
                className="px-2 py-1 rounded-md bg-accent active:scale-105 transition-all duration-200 hover:bg-accent/80"
            >
                {isEdit ? 'Update Blog' : 'Publish Blog'}
            </button>
        </div>
    );
}
