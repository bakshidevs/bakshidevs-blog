
import { LogOut } from "lucide-react";
import useAuthStore from "../store/authStore"
export default function Profile() {
    const { user, logout } = useAuthStore();
    return (
        <div>
            {user?.name}
            <button>
                <LogOut onClick={logout} />
            </button>
        </div>
    )
}
