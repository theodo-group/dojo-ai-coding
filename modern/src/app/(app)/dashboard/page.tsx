import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <span className="text-5xl">🍅</span>
        <h1 className="mt-4 text-2xl font-bold">Bienvenue dans Ketchup Compta</h1>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Le squelette de l&apos;application moderne est en place : connexion, navigation
          et structure. La migration des pages métier commence ici — choisis une page
          dans le menu et lance-toi avec Claude Code.
        </p>
        <Link
          href="/admin/societe"
          className="mt-6 inline-block rounded-xl bg-tomato-600 px-5 py-2.5 font-semibold text-white transition hover:bg-tomato-700"
        >
          Commencer par « Société »
        </Link>
      </div>
    </div>
  );
}
