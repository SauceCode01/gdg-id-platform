import { User } from "@/types/user";
import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";
import { customAlphabet } from "nanoid";
import { adminAuth, adminDb } from "./firebase/firebaseAdmin";

export const generateId = (): string => customAlphabet("1234567890", 6)();
/**
 * Checks if a user has a specific role
 */
export function isRole(user: User, role: string): boolean {
  console.log(user, role);
  return user.roles.includes(role);
}

/**
 * Extracts the uid from the auth header
 */
export async function extractUid(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  const decoded = await getAuth().verifyIdToken(token);
  return decoded.uid;
}

/**
 * Fetches a user with a specific uid
 */
export async function getUserDataWithUid(uid: string): Promise<User> {
  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();

  let user = null;

  if (!userSnap.exists) {
    user = await initializeUserData(uid);
  } else {
    user = userSnap.data() as User;
  }

  return user;
}

/**
 * Gets the user data directly from the header token
 */
export async function getUserData(req: NextRequest): Promise<User | null> {
  const uid = await extractUid(req);
  if (!uid) return null;

  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();

  let user = null;

  if (!userSnap.exists) {
    user = await initializeUserData(uid);
  } else {
    user = userSnap.data() as User;
  }

  return user;
}

/**
 * Fetches a user with a specific email
 */
export async function getUserDataWithEmail(
  email: string
): Promise<User | null> {
  const userRef = adminDb
    .collection("users")
    .where("email", "==", email)
    .limit(1);
  const userSnap = await userRef.get();

  if (!userSnap.empty) {
    return userSnap.docs[0].data() as User;
  }

  return null;
}

export const initializeUserData = async (uid: string) => {
  try {
    const user = {
      uid: uid,
      roles: ["user"],
    } as User;

    await adminDb.collection("users").doc(uid).set(user);

    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * guard admin only routes
 */

export const isAdmin = async (req: NextRequest): Promise<false | User> => {
  const userData = (await getUserData(req)) as User | null;

  if (!userData) {
    return false;
  }

  const isAdmin = await isRole(userData, "admin");

  if (!isAdmin) {
    return false;
  }

  if (userData && isAdmin) {
    return userData;
  }

  return false;
};
