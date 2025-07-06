import { Link } from "react-router"
import useAuthStore from "./store/authStore"
import { Coffee } from "lucide-react"


export default function NotFound() {
  const { isAuthenticated } = useAuthStore()
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 p-4 border border-secondary dark:border-primary/50 rounded-md bg-secondary/10 dark:bg-primary/10">
        <Coffee className="w-12 h-12 p-2 pl-0" />
        <h2 className="font-bold text-2xl underline">
          Page Not Found!
        </h2>
        <p>
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the <Link className="font-medium" to="/">homepage</Link>.
        </p>
        {isAuthenticated ? (
          <p className="mt-4">
            If you believe this is an error, please contact support.
          </p>
        ) : (
          <p className="mt-4">
            Please <Link to="/login" className="">log in</Link> to access more features.
          </p>
        )}
      </div>
    </div>
  )
}
