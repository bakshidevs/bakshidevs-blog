export default function EditorActionButtons({
    onSaveDraft,
    onPublish,
    isEdit,
}: {
    onSaveDraft: () => void;
    onPublish: () => void;
    isEdit: boolean;
}) {
    return (
        <div className="flex flex-col gap-4 font-medium fixed bottom-24 right-16">
            <button
                className="bg-olive active:scale-105 transition-all duration-200 px-2 py-1 rounded-md hover:bg-olive/80"
                onClick={onSaveDraft}
            >
                Save to Drafts
            </button>
            <button
                onClick={onPublish}
                className="px-2 py-1 rounded-md bg-accent active:scale-105 transition-all duration-200 hover:bg-accent/80"
            >
                {isEdit ? 'Update Blog' : 'Publish Blog'}
            </button>
        </div>
    );
}
