import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

/**
 * Protège toutes les routes sauf les publiques. Un visiteur non connecté qui
 * vise une page protégée est renvoyé vers /login ; un visiteur déjà connecté
 * qui ouvre /login est renvoyé vers le tableau de bord.
 *
 * Le middleware tourne sur le runtime Edge → il n'importe QUE `session.ts`
 * (Web Crypto, sans base ni `node:`), jamais `db.ts`.
 */

const PUBLIC_PATHS = ["/", "/login", "/logout"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (!PUBLIC_PATHS.includes(pathname) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
