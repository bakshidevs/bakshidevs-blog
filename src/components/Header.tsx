
// importing darkMode toggle button
import { Link, NavLink } from "react-router";
import useThemeStore from "../store/themeStore"
import { Moon, Sun } from "lucide-react";
// import useAuthStore from "../store/authStore";

export default function Header() {
  const { toggleTheme, isDarkModeEnabled } = useThemeStore();
  const navitems = [
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];
  const securedNavItems = [
    { name: "Write", path: "/write" },
    { name: "Dashboard", path: "/dashboard" }
  ]
  // const { isAuthenticated, user } = useAuthStore();
  const isAuthenticated = true;
  const user = {
    name: "Bakshi",
    email: "self@bakshidevs.com"
  }
  return (
    <header aria-label="header" className="border-0 border-b-1 border-secondary dark:border-primary bg-accent/20 flex justify-between items-center p-4 shadow-xl">
      <Link to="/">
        <h1 aria-label="logo" className="font-bold text-3xl">Bakshidevs Blog</h1>
      </Link>
      <nav aria-label="navbar">
        <ul className="flex items-center gap-4">
          {navitems.map((item) => (
            <li key={item.name} className="inline-block">
              <NavLink to={item.path} className="hover:text-secondary dark:hover:text-primary transition-colors">
                {item.name}
              </NavLink>
            </li>
          ))}
          {!isAuthenticated && (
            <li className="inline-block">
              <NavLink to="/login" className="hover:text-secondary dark:hover:text-primary transition-colors">
                Login
              </NavLink>
            </li>
          )}
          {isAuthenticated && user && securedNavItems.map(item => (
            <li key={item.name} className="inline-block">
              <NavLink to={item.path} className="hover:text-secondary dark:hover:text-primary transition-colors">
                {item.name}
              </NavLink>
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
