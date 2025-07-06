import { Link } from "react-router";


export default function Footer() {
  return (
    <footer className="bg-olive/20 font-medium text-center p-4">
        <p>&#169; 2025{" "}<Link to="https://github.com/bakshidevs" target="_blank" rel="noreferrer noopener"> Bakshidevs</Link>. All rights reserved.</p>
    </footer>
  )
}
