import { create } from "zustand";
import {
  User,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { getAuthErrorMessage } from "@/lib/firebase/firebaseErrors";
import { User as UserData } from "@/types/user";
import { getUser } from "@/lib/api/endpoints/users";

type AuthState = "checking" | "unauthenticated" | "authenticated";

type AuthStore = {
  user: User | null;
  token: string | null;
  authState: AuthState;
  error: string | null;
  userData: UserData | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const provider = new GoogleAuthProvider();

export const useAuthStore = create<AuthStore>((set) => {
  // Listen for auth state changes
  onAuthStateChanged(auth, async (user) => {
    const userData = user ? await getUser(user.uid) : null;
    set({
      user,
      authState: user ? "authenticated" : "unauthenticated",
      error: null,
      userData,
    });
  });

  // Listen for ID token changes (auto-refresh every ~1h)
  onIdTokenChanged(auth, async (user) => {
    const userData = user ? await getUser(user.uid) : null;
    if (user) {
      const token = await user.getIdToken();
      set({ user, token, userData });
    } else {
      set({ user: null, token: null });
    }
  });

  // force refresh token every 45 minutes
  setInterval(async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true); // force refresh
      set({ token });
    }
  }, 45 * 60 * 1000); // 45 minutes

  return {
    user: auth.currentUser,
    token: null,
    authState: auth.currentUser ? "authenticated" : "checking",
    error: null,
    userData: null,

    login: async (email, password) => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        set({ user: result.user, authState: "authenticated", error: null });
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ authState: "unauthenticated", error: message });
      }
    },

    register: async (email, password) => {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        set({ user: result.user, authState: "authenticated", error: null });
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ authState: "unauthenticated", error: message });
      }
    },

    loginWithGoogle: async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        set({ user: result.user, authState: "authenticated", error: null });
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ authState: "unauthenticated", error: message });
      }
    },

    logout: async () => {
      await signOut(auth);
    },
  };
});
