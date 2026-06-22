"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="text-4xl">🍅</span>
          <h1 className="mt-2 text-2xl font-bold">Connexion</h1>
        </div>

        {state.error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
              Nom d&apos;utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-tomato-500 focus:ring-2 focus:ring-tomato-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-tomato-500 focus:ring-2 focus:ring-tomato-100"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-tomato-600 px-5 py-2.5 font-semibold text-white transition hover:bg-tomato-700 disabled:opacity-60"
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Utilisateur par défaut : <code className="font-mono">admin</code> /{" "}
          <code className="font-mono">admin123</code>
        </p>
        <p className="mt-2 text-center text-xs">
          <Link href="/" className="text-tomato-600 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </main>
  );
}
