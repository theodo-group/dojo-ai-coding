import Link from "next/link";

const features = [
  { title: "Plan comptable", desc: "Plan comptable général français" },
  { title: "Journaux", desc: "Achats, ventes, banque, OD" },
  { title: "Écritures", desc: "Saisie en partie double" },
  { title: "États comptables", desc: "Grand livre, balance, journal" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="text-center">
          <span className="text-5xl">🍅</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Ketchup Compta</h1>
          <p className="mt-2 text-gray-500">
            Votre comptabilité, simplifiée — version moderne
          </p>
        </div>

        <Link
          href="/login"
          className="mt-8 block w-full rounded-xl bg-tomato-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-tomato-700"
        >
          Se connecter
        </Link>

        <div className="mt-10 border-t border-gray-100 pt-8">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-400">
            Fonctionnalités
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <p className="font-semibold text-tomato-700">{f.title}</p>
                <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Ketchup Compta · Migration legacy → Next.js
        </p>
      </div>
    </main>
  );
}
