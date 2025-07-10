
import { Link } from "react-router"
import { type BlogType } from "../store/blogStore"
import Tags from "./ui/Tags"

export default function FeaturedPost({ featuredPost }: { featuredPost: BlogType }) {
    return (
        <Link to={`blog/${featuredPost.slug}`}>
            <div aria-label="featured-post" className="h-56 sm:h-80 relative w-[90vw] sm:w-[80vw] md:w-[70vw] mx-auto rounded-md my-12 shadow-2xl shadow-secondary dark:shadow-accent/50 hover:scale-102 duration-500">
                {featuredPost.image && (<img className="h-full w-full object-cover rounded-md" src={featuredPost.image} alt={featuredPost.slug} />)}
                <div className="group absolute inset-0 dark:bg-black/40 hover:bg-black/70 text transition-all duration-500 top-0 rounded-md">
                    <div className="absolute bottom-0 p-6 text-primary">
                        <h2 className="text-2xl group-hover:underline font-bold my-1">{featuredPost.title}</h2>
                        <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {featuredPost.tags.map((tag, index) => (
                                <Tags key={index} tag={tag} />
                            ))}
                        </div>
                        <p className="">{featuredPost.excerpt}</p>
                        <div className="flex gap-2 items-center mt-2 text-xs">
                            <span className="">{featuredPost.createdAt}</span>
                            <div className="h-1 w-1 bg-primary rounded-full"></div>
                            <span className="">{featuredPost.readingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
