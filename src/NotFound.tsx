import { Link } from "react-router"
import useAuthStore from "./store/authStore"
import { Coffee } from "lucide-react"


export default function NotFound() {
  const { isAuthenticated } = useAuthStore()
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-2/3 md:max-w-125 p-8 border border-accent dark:border-accent/50 rounded-md bg-secondary/10 dark:bg-primary/10">
        <Coffee className="w-12 h-12 p-2 pl-0" />
        <h2 className="font-bold text-3xl mb-4 underline text-accent/80 hover:text-accent underline-offset-4">
          404 - Page Not Found!
        </h2>
        <p>
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the <Link className="font-medium text-olive hover:text-accent underline" to="/">homepage</Link>.
        </p>
        {isAuthenticated ? (
          <p className="mt-4">
            If you believe this is an error, please <Link className="font-medium text-olive hover:text-accent underline" to="/contact">contact</Link> support.
          </p>
        ) : (
          <p className="mt-4">
            Please <Link to="/login" className="text-olive underline hover:text-accent">log in</Link> to access more features.
          </p>
        )}
      </div>
    </div>
  )
}
