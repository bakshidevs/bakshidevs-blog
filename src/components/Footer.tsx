import { Link } from "react-router";


export default function Footer() {
  return (
    <footer className="bg-olive w-full p-4 text-center text-primary/80">
      <p>&#169; 2025{" "}<Link className="underline text-secondary/80 hover:text-primary" to="https://github.com/bakshidevs" target="_blank" rel="noreferrer noopener"> Bakshidevs</Link>. All rights reserved.</p>
      <p>Made with <span className="text-red-500">❤</span> by Bakshi.</p>
    </footer>
  )
}
