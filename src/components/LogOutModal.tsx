import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore"
import useEditorStore from "../store/editorStore";
import { CoffeeIcon, X } from "lucide-react";
// import { useEffect } from "react";


export default function LogOutModal({ isLogoutModalOpen, setIsLogoutModalOpen }: { isLogoutModalOpen: boolean, setIsLogoutModalOpen: (value: boolean) => void }) {
    const { logout, globalLogout } = useAuthStore();
    const { resetValue } = useEditorStore();
    const navigate = useNavigate();
    const handleLogout = async (logoutType: "local" | "global") => {
        if (logoutType === "local") {
            await logout();
        } else {
            await globalLogout();
        }
        resetValue();
        navigate("/");
        setIsLogoutModalOpen(false);
    }

    // portal closes when its clicked outside its scope
    // useEffect(() => {
    //     const logoutModal = document.getElementById("logout-modal");
    //     const handleOutsideClick = (e: MouseEvent) => {
    //         if (e.target !== logoutModal) {
    //             setIsLogoutModalOpen(false);
    //         }

    //     }
    //     document.addEventListener("click", handleOutsideClick);
    //     return () => {
    //         document.removeEventListener("click", handleOutsideClick);
    //     }
    // }, [setIsLogoutModalOpen])

    return isLogoutModalOpen && (
        <section className="h-screen w-screen flex justify-center items-center fixed inset-0 z-10 backdrop-blur-xl">
            <div id="logout-modal" className="bg-accent/20 p-12 rounded-md shadow-xl dark:shadow-accent/10 relative">
                <button onClick={() => setIsLogoutModalOpen(false)} className="p-1 bg-red-500 hover:bg-red-600 absolute right-2 top-2 rounded-md">
                    <X />
                </button>
                <h2 className="font-bold flex gap-2 items-center underline text-3xl text-center mb-8">
                    <CoffeeIcon className="w-10 h-10 fill-base" />
                    Log out all sessions globally?
                </h2>
                <div className="flex justify-between">
                    <button onClick={() => handleLogout("local")} className="px-2 py-1 rounded-md hover:bg-red-500 hover:text-red-100">No, just this one.</button>
                    <button onClick={() => handleLogout("global")} className="px-2 py-1 rounded-md hover:bg-red-500 hover:text-red-100">Yes.</button>
                </div>
            </div>
        </section>
    )
}
