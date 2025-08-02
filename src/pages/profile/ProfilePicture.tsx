import { Image } from "lucide-react";
import useAuthStore from "../../store/authStore";
import useBlogStore from "../../store/blogStore";

// default profile picture
import defaultProfile from "../../assets/defaultProfile.jpg";


export default function ProfilePicture() {
    const { user, fetchUser, uploadProfilePicture } = useAuthStore();
    const { uploadThumbnail } = useBlogStore();

    // handles uploading profile picture
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
    return (
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
    )
}
