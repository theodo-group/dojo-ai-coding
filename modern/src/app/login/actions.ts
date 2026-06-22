"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Veuillez remplir tous les champs." };
  }

  const ok = await login(username, password);
  if (!ok) {
    return { error: "Identifiants incorrects." };
  }

  redirect("/dashboard");
}
