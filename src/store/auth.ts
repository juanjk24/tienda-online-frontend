import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserData {
  uid: string;
  email: string | null;
  role?: string;
}

interface AuthStoreState {
  user: UserData | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthStoreActions {
  login: (userData: UserData) => void;
  logout: () => void;
  setRole: (role: string) => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isAdmin: false,

        login: (userData: UserData) =>
          set(() => ({
            user: userData,
            isAuthenticated: true,
            isAdmin: userData.role === "admin",
          })),

        logout: () =>
          set(() => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
          })),

        setRole: (role: string) =>
          set((state) => ({
            user: state.user ? { ...state.user, role } : null,
            isAdmin: role === "admin",
          })),
      }),
      {
        name: "auth-storage",

        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          isAdmin: state.isAdmin,
        }),
      }
    ),
    {
      name: "Auth Store",
    }
  )
);

export default useAuthStore;
