
export default function Tags({ tag }: { tag: string }) {
    return (
        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-accent/10 dark:bg-accent/20 rounded-full text-xs font-medium text-accent dark:text-accent/80">
            {tag}
        </span>
    )
}
