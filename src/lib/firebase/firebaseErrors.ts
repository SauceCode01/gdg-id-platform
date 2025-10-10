import { FirebaseError } from "firebase/app";

export const getAuthErrorMessage = (error: unknown): string | null => {
  console.log("getAuthErrorMessage error", error);

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Invalid email/password. Please try again.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact support for help.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      case "auth/account-exists-with-different-credential":
        return "Email already in use.";
      case "auth/popup-closed-by-user":
        return null; //"The login popup was closed before completing sign in.";
      case "auth/cancelled-popup-request":
        return null; //"The login popup was closed before completing sign in.";
      default:
        return "Something went wrong. Please try again later.";
    }
  }

  // fallback
  return "An unexpected error occurred.";
};
