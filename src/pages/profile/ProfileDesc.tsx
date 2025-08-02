import { LogOut } from "lucide-react";
import AddUsername from "../../components/AddUsername";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";
import useEditorStore from "../../store/editorStore";


export default function ProfileDesc() {
    const { user, logout } = useAuthStore();
    const [isUsernameEditing, setIsUsernameEditing] = useState<boolean>(false);
    const { resetValue } = useEditorStore();
    // once logged out user is taken to home page
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        resetValue();
        navigate("/");
    }
    return (
        <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold flex items-center gap-2">
                {user?.name} {!user?.emailVerification ? <p className="text-red-500 text-sm">(Unverified)</p> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="h-4 w-4 text-green-500 "><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>}
            </h2>
            {user?.prefs?.username ? (
                isUsernameEditing ? <AddUsername existingUsername={user?.prefs.username} isUsernameEditing={isUsernameEditing} setIsUsernameEditing={setIsUsernameEditing} /> : (
                    <div className="flex items-center gap-2">
                        <p className="text-lg text-secondary/70 dark:text-accent font-thin">@{user?.prefs.username}</p>
                        <button onClick={() => setIsUsernameEditing(true)} className="px-2 py-0.5 bg-olive rounded-md">Edit</button>
                    </div>
                )
            ) : (
                isUsernameEditing ? <AddUsername existingUsername={user?.prefs.username} isUsernameEditing={isUsernameEditing} setIsUsernameEditing={setIsUsernameEditing} /> : <button onClick={() => setIsUsernameEditing(true)} className="px-2 py-0.5 w-max bg-olive rounded-md">Add Username</button>
            )}
            <p className="text-lg text-secondary/70 dark:text-primary/50 mb-2">{user?.email}</p>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors w-max">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </div>
    )
}
