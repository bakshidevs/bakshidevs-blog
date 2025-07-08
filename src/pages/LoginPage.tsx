import Login from "../components/Login"
import Quotes from "../components/Quotes"

export default function LoginPage() {
  return (
    <div className="h-full w-screen grid md:grid-cols-2">
        <Quotes />
        <Login />
    </div>
  )
}
