import { useState } from "react";
import useEditorStore from "../store/editorStore"


export default function BlogExcerpt() {
    const { excerpt, setStateValue } = useEditorStore();
    const [charactersLeft, setCharactersLeft] = useState<number>(256)
    const handleRest = () => {
        setCharactersLeft(256);
        setStateValue({ name: "excerpt", value: "" });
    }
    return (
        <div className="relative">
            <textarea
                className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md w-full"
                value={excerpt}
                name="excerpt"
                onChange={(e) => {
                    setStateValue({ name: "excerpt", value: e.target.value })
                    setCharactersLeft(256 - e.target.value.length)
                }}
                rows={4}
                maxLength={256}
                placeholder="Write blog descript within 256 characters..."
            />
            <button onClick={handleRest} className="absolute hover:text-accent right-4 top-2">
                Reset
            </button>
            <p className="absolute bottom-3 right-3">
                {charactersLeft} characters left!
            </p>
        </div>
    )
}
