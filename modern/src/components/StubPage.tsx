/**
 * Page « à migrer ». Chaque page métier du legacy a ici un emplacement déjà
 * routé et relié à la navigation : il ne reste qu'à le remplir avec Claude Code.
 */
export default function StubPage({
  title,
  legacyPath,
}: {
  title: string;
  legacyPath: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <span className="text-4xl">🚧</span>
        <p className="mt-3 text-lg font-semibold">Page à migrer</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
          Cette page n&apos;est pas encore migrée. À toi de jouer avec Claude Code en
          t&apos;inspirant des patterns du squelette (routing, accès SQLite, layout).
        </p>
        <p className="mt-4 inline-block rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
          Référence legacy : {legacyPath}
        </p>
      </div>
    </div>
  );
}
