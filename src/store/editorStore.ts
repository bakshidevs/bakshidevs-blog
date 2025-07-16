import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    blogTitle: string;
    editorValue: string | undefined;
}

type Action = {
    setBlogTitle: (title: string | undefined) => void,
    setEditorValue: (editorValue: string | undefined) => void;
}

const useMDEditorStore = create<State & Action>()(
    persist((set) => (
        {
            blogTitle: "Beginning from the End",
            editorValue: "# Start here",
            setBlogTitle: (blogTitle: string | undefined) => {
                set({ blogTitle })
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

export default useMDEditorStore;