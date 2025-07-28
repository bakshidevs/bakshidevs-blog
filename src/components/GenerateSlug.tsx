import { useEffect } from "react";
import useEditorStore from "../store/editorStore"

export default function GenerateSlug() {
    const {slug, generateSlug, blogTitle } = useEditorStore();
    useEffect(() => {
        generateSlug();
    }, [blogTitle])
    return (
        <input
            className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
            // value={slug && `Blog will be shown at this link: https://bakshidevs.netlify.app/blog/${slug}`}
            value={slug}
            disabled
            name="slug"
            placeholder="Slug will be generated here..."
        />
    )
}
