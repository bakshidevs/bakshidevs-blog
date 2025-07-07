import type React from "react";

// importing Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// importing zustand theme store to update global theme state
import useThemeStore from "./store/themeStore";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    return (
        <div className={`${theme} grid grid-rows-[auto_1fr_auto] relative min-h-screen bg-primary dark:bg-secondary dark:accent-green-500 dark:text-primary transition-all duration-300 overflow-hidden`}>
            <Header />
            <main className="relative">
                {children}
            </main>
            <Footer />
        </div>
    )
}
