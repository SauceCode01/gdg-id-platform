"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { FcGoogle } from "react-icons/fc";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, user, loginWithGoogle } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname(); 

  // useEffect(() => {
  //   if (authState === "unauthenticated") {
  //     const redirectToLogin = async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       router.push(LOGIN_URL);
  //     };
  //     redirectToLogin();
  //   }

  //   if (
  //     authState === "authenticated" &&
  //     user &&
  //     !user.emailVerified &&
  //     !pathname.includes("/auth/logout")  
  //   ) {
  //     const redirectToEmailVerification = async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       router.push("/auth/verify-email");
  //     };
  //     redirectToEmailVerification();
  //   }
  // }, [authState, user, pathname, router]);

  if (authState === "checking") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-700 dark:border-slate-600 dark:border-t-cyan-400"></div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4"> 
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {/* login button */}
          <button
          onClick={loginWithGoogle}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm md:text-base font-medium text-gray-700">
            Login with Google
          </span>
        </button>
        </p>
      </div>
    );
  }

  if (
    authState === "authenticated" &&
    user 
  ) {
    return <>{children}</>;
  }
 

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-700 dark:border-slate-600 dark:border-t-cyan-400"></div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        An error occured
      </p>
    </div>
  );
}
