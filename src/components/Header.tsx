// importing darkMode toggle button
import { Link, NavLink } from "react-router";
import useThemeStore from "../store/themeStore"
import { CoffeeIcon, Moon, SunDim, User } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useState } from "react";

export default function Header() {
  const { toggleTheme, isDarkModeEnabled } = useThemeStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const navitems = [
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];
  const profileMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },

  ]
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header aria-label="header" className="border-0 border-secondary dark:border-primary bg-accent/50 dark:bg-accent flex justify-between items-center p-4 shadow-2xl max-w-screen">
      <div className="flex items-center gap-2">
        <Link to="/">
          <CoffeeIcon className="w-8 h-8" />
        </Link>
        <div className="">
          <Link to="/">
            <h1 aria-label="logo" className="font-bold text-xl">BakshiDevs Blog</h1>
          </Link>
          <p className="text-sm text-secondary/70 dark:text-primary/50">Before the Coffee Gets Cold!</p>
        </div>
      </div>
      <nav aria-label="navbar" className="hidden md:block">
        <ul className="flex flex-wrap items-center gap-4">
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
          {isAuthenticated && user && user.labels[0] === "admin" && (
            <>
              <li className="inline-block">
                <NavLink to="/write" className="hover:text-secondary dark:hover:text-primary transition-colors">
                  Write
                </NavLink>
              </li>
              <div className="relative inline-block">
                <button
                  onClick={() => setProfileMenuOpen(prevState => !prevState)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-secondary dark:text-primary hover:bg-secondary/10 dark:hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary dark:focus:ring-offset-primary transition"
                >
                  <User />
                </button>
                {profileMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white dark:bg-secondary rounded-xl shadow-2xl z-20 border border-secondary/10 dark:border-primary/10 animate-fade-in-up">
                    <ul className="py-2">
                      {profileMenuItems.map((item) => (
                        <li
                          onClick={() => setProfileMenuOpen(false)}
                          key={item.name}
                          className="px-4 py-2 hover:bg-secondary/10 dark:hover:bg-primary/20 rounded transition-colors"
                        >
                          <NavLink to={item.path} className="block text-secondary dark:text-primary">
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                      <li className="px-4 py-2 hover:bg-secondary/10 dark:hover:bg-primary/20 rounded transition-colors">
                        <button onClick={logout} className="block w-full text-left text-secondary dark:text-primary">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
          <div
            className="font-medium relative w-12 h-6 rounded-full bg-accent/50 dark:bg-primary/20 transition-colors duration-300 cursor-pointer flex items-center px-1"
            onClick={toggleTheme}
          >
            <span
              className={
                `absolute top-1/2 -translate-y-1/2 ${isDarkModeEnabled ? "left-1" : "left-0"} transition-all duration-300 w-5 h-5 rounded-full flex items-center justify-center shadow-md
                ${isDarkModeEnabled ? 'translate-x-6 bg-secondary' : 'translate-x-0 bg-primary'}`
              }
            >
              {isDarkModeEnabled ? <Moon className="w-4 h-4 text-primary" /> : <SunDim className="w-4 h-4 text-secondary" />}
            </span>
          </div>
        </ul>
      </nav>
    </header>
  )
}
