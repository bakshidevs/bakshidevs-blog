import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    blogTitle: string;
    thumbnailURL: string | undefined;
    slug: string | undefined;
    tags: string[];
    editorValue: string | undefined;
}

type Action = {
    setStateValue: ({ name, value }: { name: string, value: string }) => void,
    generateSlug: () => void;
    setEditorValue: (editorValue: string | undefined) => void;
}

const useEditorStore = create<State & Action>()(
    persist((set, get) => (
        {
            blogTitle: "Blog Title Goes Here",
            thumbnailURL: "",
            slug: "",
            tags: [],
            editorValue: "## Start here",
            setStateValue: ({ name, value }: { name: string, value: string }) => {
                set({
                    [name]: value
                })
            },
            generateSlug: () => {
                const { blogTitle } = get();
                const blogSlug = blogTitle.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]+/g, '');
                set({ slug: blogSlug });
            },
            setEditorValue: (editorValue: string | undefined) => {
                set({ editorValue })
            }
        }),
        {
            name: "editor-storage",
        }
    )
)

export default useEditorStore;