import type React from "react";

// importing Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// importing zustand theme store to update global theme state
import useThemeStore from "./store/themeStore";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    return (
        <div className={`${theme} relative min-h-screen bg-primary accent-[#B4637A] text-[#2F2A25] dark:bg-secondary dark:accent-green-500 dark:text-primary`}>
            <Header />
            <main className="p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}
