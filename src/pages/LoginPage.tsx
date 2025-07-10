import Login from "../components/Login.tsx"
import Quotes from "../components/Quotes.tsx"

export default function LoginPage() {
  return (
    <div className="h-full w-screen grid md:grid-cols-2">
        <Quotes />
        <Login />
    </div>
  )
}
