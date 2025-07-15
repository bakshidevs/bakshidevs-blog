import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    message: string;
    isSending: boolean;
    sent: boolean;
}

type Actions = {
    setMessage: (msg: string) => void;
    sendMessage: () => void;
}

const useFeedbackStore = create<State & Actions>()(
    persist((set) => (
        {
            message: "",
            isSending: false,
            sent: false,
            setMessage: (msg: string) => set({ message: msg }),
            sendMessage: () => {

            },
        }),
        { name: "feedback-store" }
    )
)

export default useFeedbackStore;