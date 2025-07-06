
export default function Tags({ tag }: { tag: string }) {
    return (
        <div className="bg-accent/20 dark:bg-accent/20 text-secondary dark:text-primary px-3 py-1 rounded-xl font-medium mr-2 mb-2">
            {tag}
        </div>
    )
}
