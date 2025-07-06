import type React from "react";

// importing Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// importing zustand theme store to update global theme state
import useThemeStore from "./store/themeStore";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    return (
        <div className={`${theme} relative min-h-screen bg-primary text-[#2F2A25] dark:bg-secondary dark:accent-green-500 dark:text-primary transition-all duration-300`}>
            <Header />
            <main className="">
                {children}
            </main>
            <Footer />
        </div>
    )
}
