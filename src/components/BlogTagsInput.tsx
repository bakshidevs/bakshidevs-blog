import { useState } from "react";
import useEditorStore from "../store/editorStore";
import { X } from "lucide-react";



export default function BlogTagsInput() {
  const [tagInput, setTagInput] = useState<string>("")
  const { tags, setStateValue } = useEditorStore();

  const onKeyDownTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput?.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 4) {
        setStateValue({ name: "tags", value: [...tags, newTag] })
      }
      setTagInput("");
    }
  }
  const removeTag = (tagToRemove: string) => {
    setStateValue({ name: "tags", value: tags.filter(tag => tag !== tagToRemove) })
  }
  return (
    <div className="w-full grid md:flex gap-2 bg-accent/10 px-3 py-5 ">
      <div className="flex flex-none gap-1">
        {tags && tags.map(tag => (
          <div key={tag} className="bg-accent px-1 py-0.5 rounded-md flex items-center gap-1">
            {tag} <X onClick={() => removeTag(tag)} strokeWidth={5} className="h-3 w-3 cursor-pointer hover:text-red-500" />
          </div>
        ))}
      </div>
      {tags.length < 4 && (
        <input
          className="outline-0 rounded-md w-full"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={onKeyDownTagInput}
          name="tags"
          placeholder="Tags (comma-separated)..."
          autoComplete="off"
        />
      )}
    </div>
  );
}
