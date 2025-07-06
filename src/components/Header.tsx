
// importing darkMode toggle button
import useThemeStore from "../store/themeStore"

export default function Header() {
    const { toggleTheme } = useThemeStore();
  return (
    <header className="border-0 border-b-1 border-secondary dark:border-primary bg-accent/20 flex justify-between items-center p-4 shadow-xl">
        <h1 className="font-bold text-3xl">Bakshidevs Blog</h1>
        <nav>
            <button className="font-medium px-3 py-2 rounded-md bg-accent/90 hover:bg-accent" onClick={toggleTheme}>Theme</button>
        </nav>
    </header>
  )
}
