# Dojo AI Coding — Migration Ketchup Compta

Repo-exercice pour apprendre à **migrer une appli legacy avec Claude Code**.

- `legacy/` — l'appli PHP d'origine (**Ketchup Compta**, comptabilité en partie double). À migrer.
- `modern/` — la cible **Next.js** : squelette livré (accueil, login, logout, nav, dashboard) ; pages métier à migrer.
- Glossaire : [CONTEXT.md](CONTEXT.md).

## Agent skills

Config pour `to-prd`, `to-issues`, `grill-with-docs`, `domain-modeling`.

**Issue tracker — markdown local sous `docs/issues/`** (pas de SaaS) :
- Une page par dossier `docs/issues/<feature-slug>/` ; PRD = `PRD.md` ; tickets = `issues/<NN>-<slug>.md`.
- « publish to the issue tracker » → créer le fichier ; « fetch the ticket » → lire le chemin donné.
- Pas de workflow de triage : les tickets sont implémentés dans la foulée (ignorer les histoires de labels/`Status:`).

**Domain docs** : mono-contexte — [CONTEXT.md](CONTEXT.md) racine + `docs/adr/`. Utiliser le vocabulaire du glossaire ; signaler toute contradiction avec un ADR.
