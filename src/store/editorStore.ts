import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    editorValue: string | undefined;
}

type Action = {
    setEditorValue: (editorValue: string | undefined) => void;
}

const useMDEditorStore = create<State & Action>()(
    persist((set) => (
        {
            editorValue: "# Start here",
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