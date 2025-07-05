
// importing darkMode toggle button
import useThemeStore from "../store/themeStore"

export default function Header() {
    const { toggleTheme } = useThemeStore();
  return (
    <header className="bg-[#B4637A] flex justify-between items-center p-4">
        <h1 className="font-bold text-3xl">Bakshidevs Blog</h1>
        <nav>
            <button className="font-medium" onClick={toggleTheme}>Theme</button>
        </nav>
    </header>
  )
}
