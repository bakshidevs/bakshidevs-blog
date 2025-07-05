import type React from "react";

// importing Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className="min-h-screen bg-gray-100 text-black p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}
