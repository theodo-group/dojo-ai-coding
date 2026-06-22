import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { getDb } from "@/lib/db";
import { signSession, verifySession, type Session } from "@/lib/session";

const COOKIE = "session";

/**
 * Hash MD5 salé — on reproduit EXACTEMENT le legacy (`md5('legacy' . $password)`),
 * pour pouvoir valider les mots de passe déjà en base sans réinitialiser.
 * (Volontairement faible : c'est le hash hérité, pas un exemple à suivre.)
 */
function hashPassword(password: string): string {
  return createHash("md5").update("legacy" + password).digest("hex");
}

type UserRow = { id: number; username: string; password_hash: string };

/** Vérifie les identifiants contre la table `users` et ouvre une session. */
export async function login(username: string, password: string): Promise<boolean> {
  const user = getDb()
    .prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
    .get(username) as UserRow | undefined;

  if (!user || hashPassword(password) !== user.password_hash) return false;

  const token = await signSession({ uid: user.id, username: user.username });
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 h
  });
  return true;
}

export async function logout(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** Session courante (ou null), lue depuis le cookie signé. */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? verifySession(token) : null;
}
