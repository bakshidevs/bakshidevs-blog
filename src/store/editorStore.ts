import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface ThumbnailProps {
//     thumbnail: string | undefined;
//     thumbnailID: string | undefined;
// }

type State = {
    blogTitle: string;
    thumbnailURL: string | undefined;
    slug: string | undefined;
    excerpt: string;
    tags: string[];
    editorValue: string | undefined;
}

type Action = {
    setStateValue: ({ name, value }: { name: string, value: string | string[] }) => void,
    generateSlug: () => void;
    setEditorValue: (editorValue: string | undefined) => void;
    resetValue: () => void;
}

const useEditorStore = create<State & Action>()(
    persist((set, get) => (
        {
            blogTitle: "Blog Title Goes Here",
            thumbnailURL: "",
            slug: "",
            excerpt: "",
            tags: [],
            editorValue: "## Start here",
            setStateValue: ({ name, value }: { name: string, value: string[] | string }) => {
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
            },
            resetValue: () => {
                set({
                    blogTitle: "Blog Title Goes Here",
                    thumbnailURL: "",
                    slug: "",
                    tags: [],
                    editorValue: "## Start here"
                });
            }
        }),
        {
            name: "editor-storage",
        }
    )
)

export default useEditorStore;