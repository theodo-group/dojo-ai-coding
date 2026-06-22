/**
 * Session signée — sans dépendance.
 *
 * Un cookie de session est un texte `<payload>.<signature>` :
 *  - payload  = les infos de session encodées en base64 (id + username)
 *  - signature = HMAC-SHA256 du payload, avec un secret serveur
 *
 * Sans la bonne signature, impossible de fabriquer un cookie valide → on ne
 * peut pas se faire passer pour un autre utilisateur. On utilise la Web Crypto
 * API (`crypto.subtle`), disponible côté serveur ET dans le middleware.
 */

const SECRET = process.env.SESSION_SECRET ?? "dojo-ai-coding-dev-secret-change-me";
const encoder = new TextEncoder();

export type Session = { uid: number; username: string };

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signSession(session: Session): Promise<string> {
  const payload = toBase64(encoder.encode(JSON.stringify(session)));
  const sig = await crypto.subtle.sign("HMAC", await getKey(), encoder.encode(payload));
  return `${payload}.${toBase64(new Uint8Array(sig))}`;
}

export async function verifySession(token: string): Promise<Session | null> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const valid = await crypto.subtle.verify(
    "HMAC",
    await getKey(),
    fromBase64(sig),
    encoder.encode(payload),
  );
  if (!valid) return null;

  try {
    return JSON.parse(new TextDecoder().decode(fromBase64(payload))) as Session;
  } catch {
    return null;
  }
}
