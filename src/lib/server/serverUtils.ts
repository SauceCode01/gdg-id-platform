"use server";

import { User } from "@/types/user";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { adminAuth, adminDb } from "../firebase/firebaseAdmin";

/**
 * Creates a randomly generated id
 */
export const generateId = async (): Promise<string> => {
  try {
    return customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 12)();
  } catch (err) {
    throw new Error("An error occurred while generating id.");
  }
};

/**
 * Checks if a user has a specific role
 */
export const isRole = async (user: User, role: string): Promise<boolean> => {
  try {
    return user.roles.includes(role);
  } catch (err: unknown) {
    throw new Error("An error occurred while checking user role.");
  }
};

/**
 * Extracts the uid from the auth header
 */
export const extractUid = async (req: NextRequest): Promise<string | null> => {
  try {
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
  } catch (err: unknown) {
    throw new Error("An error occurred while extracting uid.");
  }
};

/**
 * Fetches a user with a specific uid
 */
export const getUserDataWithUid = async (uid: string): Promise<User> => {
  try {
    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();

    let user = null;

    if (!userSnap.exists) {
      user = await initializeUserData(uid);
    } else {
      user = userSnap.data() as User;
    }

    return user;
  } catch (err: unknown) {
    throw new Error("An error occurred while extracting user data with uid.");
  }
};

/**
 * Gets the user data directly from the header token
 */
export const getUserData = async (req: NextRequest): Promise<User | null> => {
  try {
    const uid = await extractUid(req);
    if (!uid) return null;

    const user = await getUserDataWithUid(uid);
    return user;
  } catch (err: unknown) {
    throw new Error("An error occurred while extracting user data.");
  }
};

export const initializeUserData = async (uid: string) => {
  try {
    const user = {
      uid: uid,
      roles: ["user"],
    } as User;

    await adminDb.collection("users").doc(uid).set(user);

    return user;
  } catch (err: unknown) {
    throw new Error("An error occurred while initializing user data.");
  }
};
 