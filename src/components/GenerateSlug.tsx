
export default function GenerateSlug({ value }: { value: string }) {
    
    return (
        <input
            className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
            // value={slug && `Blog will be shown at this link: https://bakshidevs.netlify.app/blog/${slug}`}
            value={value}
            disabled
            name="slug"
            placeholder="Slug will be generated here..."
        />
    )
}
