import Signup from "../components/Signup";
import Quotes from "../components/Quotes";

export default function SignupPage() {
  return (
    <div className="h-full w-screen grid md:grid-cols-2">
      <Quotes />
      <Signup />
    </div>
  )
}
