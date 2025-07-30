// importing darkMode toggle button
import { Link, NavLink } from "react-router";
import useThemeStore from "../store/themeStore"
import { CoffeeIcon, LogOut, Menu, Moon, SunDim, User, X } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useState } from "react";

export default function Header() {
  const { toggleTheme, isDarkModeEnabled } = useThemeStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navitems = [
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];
  const profileMenuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },

  ]
  const { isAuthenticated, user, logout } = useAuthStore();
  const closeMenus = () => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  }

  return (
    <header aria-label="header" className="relative border-0 border-secondary dark:border-primary text-secondary dark:text-primary bg-accent/50 dark:bg-accent flex justify-between items-center px-12 py-4 shadow-2xl max-w-screen">
      <div className="flex items-center gap-2">
        <Link to="/">
          <CoffeeIcon className="w-8 h-8 coffee" />
        </Link>
        <div className="">
          <Link to="/">
            <h1 aria-label="logo" className="font-bold text-xl">BakshiDevs Blog</h1>
          </Link>
          <p className="text-sm text-secondary/70 dark:text-primary/50">Before the Coffee Gets Cold!</p>
        </div>
      </div>
      {/* Desktop Navigation */}
      <nav aria-label="navbar" className="hidden md:flex items-center gap-6 text-xl">
        <ul className="flex flex-wrap items-center gap-4">
          {navitems.map((item) => (
            <li key={item.name} className="inline-block">
              <NavLink to={item.path} className={({ isActive }) => `hover:text-secondary dark:hover:text-primary transition-colors ${isActive ? 'font-bold underline' : ''}`}>
                {item.name}
              </NavLink>
            </li>
          ))}
          {isAuthenticated ? (
            <>
              {user?.labels.includes("admin") && (
                <li className="inline-block">
                  <NavLink to="/write" className={({ isActive }) => `hover:text-secondary dark:hover:text-primary transition-colors ${isActive ? 'font-bold underline' : ''}`}>
                    Write
                  </NavLink>
                </li>
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
              <div className="relative inline-block">
                <button
                  onClick={() => setProfileMenuOpen(prevState => !prevState)}
                  className="inline-flex items-center justify-center p-2 rounded-full text-secondary dark:text-primary hover:bg-secondary/10 dark:hover:bg-primary/20 transition"
                >
                  {user?.prefs.profilePicture ? (
                    <img className="w-12 h-12 rounded-full object-cover border-2 border-primary" src={user?.prefs.profilePicture} alt={`${user.name} profile picture`} />
                  ) : (
                    <User className="w-12 h-12" />
                  )
                  }
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-secondary rounded-xl shadow-2xl z-20 border border-secondary/10 dark:border-primary/10 animate-fade-in-up">
                    <ul className="py-2">
                      {profileMenuItems.map((item) => (
                        <li
                          onClick={closeMenus}
                          key={item.name}
                          className="px-4 py-2 hover:bg-secondary/10 dark:hover:bg-primary/20 rounded transition-colors"
                        >
                          <NavLink to={item.path} className="block w-full text-left text-secondary dark:text-primary">
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                      {user?.labels.includes("admin") && (
                        <li
                          onClick={closeMenus}
                          className="px-4 py-2 hover:bg-secondary/10 dark:hover:bg-primary/20 rounded transition-colors"
                        >
                          <NavLink to="/dashboard" className="block w-full text-left text-secondary dark:text-primary">
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      <li>
                        <hr className="my-2 border-secondary/10 dark:border-primary/10" />
                      </li>
                      <li className="px-4 py-2 hover:bg-secondary/10 dark:hover:bg-primary/20 rounded transition-colors">
                        <button onClick={() => { logout(); closeMenus(); }} className="flex items-center gap-2 w-full text-left text-secondary dark:text-primary">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <li className="inline-block">
              <NavLink to="/login" className={({ isActive }) => `hover:text-secondary dark:hover:text-primary transition-colors ${isActive ? 'font-bold underline' : ''}`}>
                Login
              </NavLink>
            </li>
          )}
        </ul>

      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          {isDarkModeEnabled ? <SunDim className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button onClick={() => setMobileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-secondary/95 backdrop-blur-sm border-t border-secondary/20 dark:border-primary/20 shadow-lg z-50 animate-fade-in-down">
          <nav className="p-4">
            <ul className="flex flex-col gap-1">
              {navitems.map(item => (
                <li key={`mobile-${item.name}`}>
                  <NavLink to={item.path} onClick={closeMenus} className={({ isActive }) => `block w-full p-3 rounded-md text-lg ${isActive ? 'bg-accent/20 font-semibold' : ''}`}>{item.name}</NavLink>
                </li>
              ))}
              <hr className="my-2 border-secondary/20 dark:border-primary/20" />
              {isAuthenticated ? (
                <>
                  {user?.labels.includes("admin") && (
                    <li><NavLink to="/write" onClick={closeMenus} className={({ isActive }) => `block w-full p-3 rounded-md text-lg ${isActive ? 'bg-accent/20 font-semibold' : ''}`}>Write</NavLink></li>
                  )}
                  {profileMenuItems.map(item => (
                    <li key={`mobile-${item.name}`}><NavLink to={item.path} onClick={closeMenus} className={({ isActive }) => `block w-full p-3 rounded-md text-lg ${isActive ? 'bg-accent/20 font-semibold' : ''}`}>{item.name}</NavLink></li>
                  ))}
                  <li><button onClick={() => { logout(); closeMenus(); }} className="flex items-center gap-2 w-full p-3 rounded-md text-lg text-red-500"><LogOut className="w-5 h-5" /> Logout</button></li>
                </>
              ) : (
                <li><NavLink to="/login" onClick={closeMenus} className={({ isActive }) => `block w-full p-3 rounded-md text-lg ${isActive ? 'bg-accent/20 font-semibold' : ''}`}>Login</NavLink></li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
