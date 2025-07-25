
import remarkGfm from "remark-gfm";
import Tags from "../components/ui/Tags.tsx";

import MDEditor from "@uiw/react-md-editor";
import useBlogStore from "../store/blogStore.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";
import { useParams } from "react-router";

export default function BlogPage() {
  const { currentBlog } = useBlogStore();
  const param = useParams();
  console.log(param.slug);
  

  return currentBlog ? (
    <div className="my-12 w-full">
      <img aria-label="blog-thumbani" className="h-56 w-full object-center object-cover" src={currentBlog.image} alt={currentBlog.title} />
      <div aria-label="blog-body" className="md:w-2/3 p-8 mx-auto my-12">
        <h2 className="font-bold text-3xl">{currentBlog.title}</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {currentBlog.tags.map((tag, index) => (
            <Tags key={index} tag={tag} />
          ))}
        </div>
        <p className="text-secondary/60 dark:text-primary/60 text-sm mt-2">
          {new Date(currentBlog.createdAt).toLocaleDateString()} by {currentBlog.author} - {currentBlog.readingTime}
        </p>
        <p className="text-secondary/60 dark:text-primary/60 mt-4">{currentBlog.excerpt}</p>
        <div className="mt-6 prose">
          <MDEditor.Markdown className="" remarkPlugins={[remarkGfm]} source={currentBlog.content} />
        </div>
      </div>
    </div>
  ) : (
    <LoadingScreen />
  )
}
