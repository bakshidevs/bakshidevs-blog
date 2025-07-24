
import { Link } from "react-router"
import { type BlogType } from "../store/blogStore"
import Tags from "./ui/Tags"

export default function FeaturedPost({ featuredPost }: { featuredPost: BlogType }) {
    return (
        <Link to={`blog/${featuredPost.slug}`}>
            <section aria-label="featured-post" className="h-56 sm:h-72 md:h-84 lg:h-92 relative mx-auto rounded-md my-12 shadow-2xl hover:shadow-base dark:shadow-accent/50 dark:hover:shadow-accent hover:scale-101 duration-500">
                {featuredPost.image && (<img className="h-full w-full object-cover rounded-md" src={featuredPost.image} alt={featuredPost.slug} />)}
                <div className="group absolute inset-0 bg-black/20 dark:bg-black/40 hover:bg-black/70 text transition-all duration-500 top-0 rounded-md">
                    <div className="absolute bottom-0 p-6 text-primary">
                        <h2 className="text-xl md:text-4xl group-hover:underline font-bold my-1">{featuredPost.title}</h2>
                        <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {featuredPost.tags.map((tag, index) => (
                                <Tags key={index} tag={tag} />
                            ))}
                        </div>
                        <p className="text-sm">{featuredPost.excerpt}</p>
                        <div className="flex gap-2 items-center mt-2 text-xs">
                            <span className="">{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                            <div className="h-1 w-1 bg-primary rounded-full"></div>
                            <span className="">{featuredPost.readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </section >
        </Link>
    )
}
