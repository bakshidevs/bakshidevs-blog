import { useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function Index() {
    useEffect(() => {
        document.title = "BakshiDevs Blog";
    })
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <BlogCard />
        </div>
    )
}
