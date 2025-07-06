import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type States = {
    isDarkModeEnabled: boolean;
    theme: "light" | "dark";
};

type Actions = {
    toggleTheme: () => void;
}

type ThemeStore = States & Actions;

const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            isDarkModeEnabled: false,
            theme: "light",
            toggleTheme: () => set((state) => {
                const isDark = !state.isDarkModeEnabled
                return {
                    isDarkModeEnabled: isDark,
                    theme: isDark ? "dark" : "light"
                }
            })
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useThemeStore;