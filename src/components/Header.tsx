
// importing darkMode toggle button
import { Link } from "react-router";
import useThemeStore from "../store/themeStore"
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { toggleTheme, isDarkModeEnabled } = useThemeStore();
  const navitems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "login", path: "/Login" },
  ];
  return (
    <header aria-label="header" className="border-0 border-b-1 border-secondary dark:border-primary bg-accent/20 flex justify-between items-center p-4 shadow-xl">
      <h1 aria-label="logo" className="font-bold text-3xl">Bakshidevs Blog</h1>
      <nav aria-label="navbar">
        <ul>
          {navitems.map((item) => (
            <li key={item.name} className="inline-block mr-4">
              <Link to={item.path} className="text-lg font-medium hover:text-secondary dark:hover:text-primary transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
          <button className="font-medium px-3 py-2 rounded-md bg-accent/90 hover:bg-accent dark:bg-primary/20" onClick={toggleTheme}>
            {isDarkModeEnabled ? <Sun /> : <Moon className="text-primary" />}
          </button>
        </ul>
      </nav>
    </header>
  )
}
