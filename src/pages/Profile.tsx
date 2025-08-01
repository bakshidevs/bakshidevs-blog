
import { Image, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";
import { Link, Outlet, useLocation } from "react-router";
import defaultProfile from "../assets/defaultProfile.jpg";
import useBlogStore from "../store/blogStore";
import { useEffect, useState } from "react";
import useEditorStore from "../store/editorStore";
import AddUsername from "../components/AddUsername";

export default function Profile() {
    const { fetchUser, user, logout, uploadProfilePicture } = useAuthStore();
    const { uploadThumbnail, getBlogsByAuthor } = useBlogStore();
    const location = useLocation();

    const [isUsernameEditing, setIsUsernameEditing] = useState<boolean>(false);




    const { resetValue } = useEditorStore();

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "border-accent text-accent"
            : "border-transparent text-secondary/70 dark:text-primary/50 hover:text-secondary dark:hover:text-primary";
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    useEffect(() => {
        if (user) {
            getBlogsByAuthor(user.$id);
        }
    }, [user, getBlogsByAuthor])

    const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageURL = await uploadThumbnail(e.target.files[0]);
            if (imageURL) {
                await uploadProfilePicture(imageURL);
                // user fetched to show the latest update without page reload
                fetchUser();
            }
        }
    }

    const handleLogout = () => {
        logout();
        resetValue();
    }


    return (
        <div className="flex flex-col items-center w-full gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl">
                <div className="w-64 h-64 relative overflow-hidden">
                    <img
                        src={
                            user?.prefs.profilePicture
                                ? user?.prefs.profilePicture
                                : defaultProfile
                        }
                        alt="profile"
                        className="-z-1 w-full h-full object-cover rounded-full border-4 border-accent"
                    />
                    <label htmlFor="profile-picture-upload" className="cursor-pointer">
                        <Image className="w-8 h-8 bg-accent absolute bottom-4 right-4 p-1 rounded z-10" />
                        <input
                            id="profile-picture-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureUpload}
                        />
                    </label>
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        {user?.name} {!user?.emailVerification ? <p className="text-red-500 text-sm">(Unverified)</p> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="h-4 w-4 text-green-500 "><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>}
                    </h2>
                    {user?.prefs?.username ? (
                        isUsernameEditing ? <AddUsername setIsUsernameEditing={setIsUsernameEditing} /> : (
                            <div className="flex items-center gap-2">
                                <p className="text-lg text-secondary/70 dark:text-accent font-thin">@{user?.prefs.username}</p>
                                <button onClick={() => setIsUsernameEditing(true)} className="px-2 py-0.5 bg-olive rounded-md">Edit</button>
                            </div>
                        )
                    ) : (
                        isUsernameEditing ? <AddUsername setIsUsernameEditing={setIsUsernameEditing} /> : <button onClick={() => setIsUsernameEditing(true)} className="px-2 py-0.5 w-max bg-olive rounded-md">Add Username</button>
                    )}
                    <p className="text-lg text-secondary/70 dark:text-primary/50 mb-2">{user?.email}</p>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors w-max">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-5xl">
                <div className="flex justify-center gap-8 border-b border-secondary/20 dark:border-primary/20 mb-8">
                    {user?.labels.includes("admin") && (
                        <>
                            <Link to="/profile/posted" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/posted")}`}>
                                Posted
                            </Link>
                            <Link to="/profile/drafts" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/drafts")}`}>
                                Drafts
                            </Link>
                        </>
                    )}
                    <Link to="/profile/saved" className={`py-4 px-2 border-b-2 font-medium transition-colors ${getLinkClass("/profile/saved")}`}>
                        Saved
                    </Link>
                </div>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
