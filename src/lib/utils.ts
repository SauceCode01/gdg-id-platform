
 

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "./firebase/firebase";
import { getAuth } from "firebase/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



 
export const wrappedFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const token = await auth.currentUser?.getIdToken();

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const isAuthenticated = async () =>
  (await getAuth().currentUser) !== null;

export const arrayIntersecting = (arr1: unknown[], arr2: unknown[]): boolean => {
  return arr1.some((item) => arr2.includes(item));
};
