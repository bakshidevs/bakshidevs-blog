import { useState } from "react";
import useEditorStore from "../store/editorStore"


export default function BlogExcerpt() {
    const { excerpt, setStateValue } = useEditorStore();
    const [charactersLeft, setCharactersLeft] = useState<number>()
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
            <p className="absolute bottom-2 right-2">
                {charactersLeft} characters left!
            </p>
        </div>
    )
}
