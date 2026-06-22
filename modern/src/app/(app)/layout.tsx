import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AppNav from "@/components/AppNav";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold">
          <span className="text-xl">🍅</span> Ketchup Compta
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            Connecté : <strong className="text-gray-800">{session.username}</strong>
          </span>
          <Link href="/logout" className="text-tomato-600 hover:underline">
            Déconnexion
          </Link>
        </div>
      </header>

      <div className="flex">
        <AppNav />
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
