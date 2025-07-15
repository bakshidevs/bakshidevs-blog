import type { Models } from 'appwrite';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { account, ID } from '../lib/appwrite.ts';



type AuthState = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: Models.User<Models.Preferences> | null;
}



type AuthActions = {
    fetchUser: () => Promise<{ success: boolean }>;
    signup: ({ email, password, fullname }: { email: string, password: string, fullname: string }) => Promise<{ success: boolean }>;
    login: ({ email, password }: { email: string, password: string }) => Promise<{ success: boolean }>;
    logout: () => Promise<void>;
    globalLogout: () => Promise<void>;
    // deleteAccount: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist((set) => ({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        fetchUser: async () => {
            set({ isLoading: true });
            try {
                const user = await account.get()
                set({ user, isAuthenticated: true, isLoading: false });

                return { success: true };
            } catch (error) {
                console.error("Error fetching user:", error);
                set({ user: null, isAuthenticated: false });
                return { success: false };
            } finally {
                set({ isLoading: false });
            }
        },
        signup: async ({ email, password, fullname }) => {
            set({ isLoading: true });
            try {
                await account.create(ID.unique(), email, password, fullname);
                await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                set({ user, isAuthenticated: true, });
                return { success: true };

            } catch (error) {
                console.error("Error creating account:", error);
                return { success: false };
            } finally {
                set({ isLoading: false });
            }
        },
        login: async ({ email, password }) => {
            set({ isLoading: true });
            try {
                await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                set({ user, isAuthenticated: true, });
                return { success: true };

            } catch (error) {
                console.error("Error logging in:", error);
                return { success: false };

            } finally {
                set({ isLoading: false });
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
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useAuthStore;