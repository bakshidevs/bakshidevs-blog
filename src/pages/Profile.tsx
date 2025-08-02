import useAuthStore from "../store/authStore";


import { useEffect } from "react";
import ProfileBlogsSection from "./profile/ProfileBlogsSection";
import ProfileDesc from "./profile/ProfileDesc";
import ProfilePicture from "./profile/ProfilePicture";

export default function Profile() {
    const { fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser])


    return (
        <div className="flex flex-col items-center w-full gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl">
                <ProfilePicture />
                <ProfileDesc />
            </div>
            <ProfileBlogsSection />
        </div>
    );
}
