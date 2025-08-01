import { Check } from 'lucide-react';
import { useState } from 'react'
import useAuthStore from '../store/authStore';

export default function AddUsername({ setIsUsernameEditing }: { setIsUsernameEditing: (value: boolean) => void }) {
    const { fetchUser, addUsername } = useAuthStore();
    const [username, setUsername] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUsernameEditing(false);
        // username added/edited via authstore
        await addUsername(username);
        setUsername("");
        // user fetched to show the latest username without page reload
        fetchUser();
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 my-1">
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username" className="bg-accent/10 px-2 py-1 outline-0 focus:outline-1 focus:outline-accent rounded-md" />
            <button type="submit" className="bg-olive px-2 py-1 rounded-md hover:bg-olive/80 transition-colors">
                <Check />
            </button>
        </form>
    )
}
