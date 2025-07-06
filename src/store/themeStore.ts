import { create } from "zustand";

type States = {
    isDarkModeEnabled: boolean;
    theme: "light" | "dark";
};

type Actions = {
    toggleTheme: () => void;
}

const useThemeStore = create<States & Actions>((set) => ({
    isDarkModeEnabled: false,
    theme: "light",
    toggleTheme: () => set((state) => {
        const isDarkModeEnabled = !state.isDarkModeEnabled
        return {
        isDarkModeEnabled: isDarkModeEnabled,
        theme: isDarkModeEnabled ? "dark" : "light"
    }
    })
}))

export default useThemeStore;