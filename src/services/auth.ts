import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User, type IdTokenResult } from "firebase/auth";

import { auth } from "./firebase";

export async function login(
  email: string,
  password: string
): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function register(
  email: string,
  password: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Obtiene el token del usuario con los custom claims
 */
export async function getUserToken(forceRefresh: boolean = false): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  
  return await user.getIdToken(forceRefresh);
}

/**
 * Obtiene el rol del usuario desde los custom claims
 */
export async function getUserRole(): Promise<string> {
  const user = auth.currentUser;
  if (!user) return "user";
  
  const tokenResult: IdTokenResult = await user.getIdTokenResult();
  return tokenResult.claims.role as string || "user";
}
