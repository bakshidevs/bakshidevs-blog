import type { Models } from 'appwrite';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { account, ID } from '../lib/appwrite';



type AuthState = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: Models.User<Models.Preferences> | null;
}

type AuthActions = {
    createAccount: ({ email, password, fullname }: { email: string, password: string, fullname: string }) => Promise<void>;
    login: ({ email, password }: { email: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    globalLogout: () => Promise<void>;
    // deleteAccount: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist((set) => ({
        isLoading: true,
        isAuthenticated: false,
        user: null,
        createAccount: async ({ email, password, fullname }) => {
            try {
                await account.create(ID.unique(), email, password, fullname);
                await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                set({ user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                console.error("Error creating account:", error);
            }
        },
        login: async ({ email, password }) => {
            try {
                await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                set({ user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                console.error("Error logging in:", error);

            }
        },
        logout: async () => {
            try {
                await account.deleteSession('current');
                set({ user: null, isAuthenticated: false, isLoading: false });
            } catch (error) {
                console.error("Error logging out:", error);

            }
        },
        globalLogout: async () => {
            try {
                await account.deleteSessions();
                set({ user: null, isAuthenticated: false, isLoading: false });
            } catch (error) {
                console.error("Error logging out globally:", error);

            }
        },
        // deleteAccount: async() => {
        //     try {
        //         await account.delete();
        //         set({ user: null, isAuthenticated: false, isLoading: false });
        //     } catch (error) {
        //         console.error("Error deleting account:", error);

        //     }
        // }
    }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

export default useAuthStore;