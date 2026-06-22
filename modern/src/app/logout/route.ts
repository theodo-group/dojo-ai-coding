import { NextResponse, type NextRequest } from "next/server";
import { logout } from "@/lib/auth";

/** Déconnexion : on efface le cookie de session et on renvoie vers /login. */
export async function GET(req: NextRequest) {
  await logout();
  return NextResponse.redirect(new URL("/login", req.url));
}
