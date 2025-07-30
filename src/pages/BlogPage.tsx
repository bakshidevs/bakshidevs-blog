
import remarkGfm from "remark-gfm";
import Tags from "../components/ui/Tags.tsx";

import MDEditor from "@uiw/react-md-editor";
import useBlogStore from "../store/blogStore.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import NotFound from "../NotFound.tsx";
import useAuthStore from "../store/authStore.ts";

export default function BlogPage() {
  const { user } = useAuthStore();
  const { getBlogBySlug, currentBlog, isLoading, deleteBlog } = useBlogStore();
  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (param.slug) {
      getBlogBySlug(param.slug);
    }
  }, [param.slug, getBlogBySlug])

  if (isLoading) {
    return <LoadingScreen />
  }
  const handleDeletion = (blogId: string) => {
    deleteBlog(blogId);
    navigate("/profile/drafts");
  }

  return currentBlog && !isLoading ? (
    <div className="my-12 w-full relative">
      {/* <img aria-label="blog-thumbani" className="h-56 w-full object-center object-cover" src={currentBlog.image} alt={currentBlog.title} /> */}
      {user?.labels.includes("admin") && user?.$id === currentBlog.author && (
        <div className="flex gap-3 justify-end m-0 mr-6">
          <Link to={`/edit/${currentBlog.slug}`}>
            <button className="px-3 py-2 text-secondary hover:text-amber-900 font-medium bg-amber-200 rounded-md hover:bg-amber-300 transition-colors">
              Edit
            </button>
          </Link>
          <button onClick={() => handleDeletion(currentBlog.$id!)} className="px-3 py-2 text-primary hover:text-red-200 font-medium bg-red-500 rounded-md hover:bg-red-600 transition-colors">
            Delete
          </button>
        </div>
      )}
      <div aria-label="blog-body" className="md:w-2/3 p-8 mx-auto mb-12">
        <h2 className="font-bold text-3xl">{currentBlog.title}</h2>
        <img className="max-h-84 h-auto object-cover mx-auto my-4 rounded-md" src={currentBlog.image} alt={currentBlog.slug} />
        <div className="flex flex-wrap gap-2 mt-4">
          {currentBlog.tags.map((tag, index) => (
            <Tags key={index} tag={tag} />
          ))}
        </div>
        <p className="text-secondary/60 dark:text-primary/60 text-sm mt-2">
          {new Date(currentBlog.createdAt).toLocaleDateString()} by @{currentBlog.username} - {currentBlog.readingTime} mins read
        </p>
        <div className="mt-6 prose">
          <MDEditor.Markdown className="" remarkPlugins={[remarkGfm]} source={currentBlog.content} />
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  )
}
