import { Tag } from "lucide-react";

export default function Tags({ tag }: { tag: string }) {
    return (
        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-accent/10 dark:bg-accent/20 rounded-full text-xs font-medium text-accent dark:text-accent/80 flex gap-1 items-center">
            <Tag className="h-4 w-4" />{tag}
        </span>
    )
}
