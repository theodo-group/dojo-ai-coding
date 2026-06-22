# Ketchup Compta — version moderne (Next.js)

Squelette de l'application cible pour le TP de migration. **Pas de page métier** ici :
juste la structure (accueil, login/logout, navigation, tableau de bord) et les patterns
à imiter pour migrer le reste.

> Le tutoriel complet du TP est dans le [README racine](../README.md).

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000  — login : admin / admin123
```

Prérequis : **Node 24+** (pour `node:sqlite`, intégré à Node — aucune dépendance native,
aucun Docker).

## Stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**
- Base **SQLite** via `node:sqlite` (module intégré à Node)
- Authentification **faite main** (cookie signé + middleware), sans librairie d'auth

## Carte du squelette

```
src/
├── app/
│   ├── page.tsx              # / — page d'accueil publique
│   ├── login/                # /login — formulaire (server action) + connexion
│   ├── logout/route.ts       # /logout — efface le cookie
│   └── (app)/                # zone connectée (header + nav imposés par le layout)
│       ├── layout.tsx        # vérifie la session, sinon redirige vers /login
│       ├── dashboard/        # tableau de bord (message d'accueil)
│       ├── ecritures/        # ┐
│       ├── etats/            # ├ pages métier = stubs « à migrer »
│       └── admin/            # ┘
├── components/
│   ├── AppNav.tsx            # navigation (calquée sur le menu du legacy)
│   └── StubPage.tsx          # le bloc « 🚧 Page à migrer »
├── lib/
│   ├── db.ts                 # accès SQLite + seed auto depuis ../legacy/sql/
│   ├── session.ts            # cookie signé (HMAC, Web Crypto)
│   ├── auth.ts               # login / logout / getSession (hash MD5 du legacy)
│   └── nav.ts                # arborescence de navigation
└── middleware.ts             # protège les routes non publiques
```

## Comment ça marche

- **Base de données** — au premier accès, `db.ts` crée `modern/data/compta.db` et rejoue
  les scripts SQL du legacy (`../legacy/sql/*.sql`). Mêmes données que l'ancienne appli,
  fichier propre, sans Docker. Le dossier `data/` est ignoré par git.
- **Connexion** — `auth.ts` vérifie l'identifiant contre la table `users` avec le hash
  MD5 hérité du legacy, puis pose un cookie de session **signé** (`session.ts`).
- **Protection des pages** — `middleware.ts` lit le cookie et redirige vers `/login`
  tout accès non connecté (il n'utilise que la Web Crypto, jamais la base).

## Migrer une page (rappel)

Chaque stub (`src/app/(app)/.../page.tsx`) est déjà routé et relié à la navigation : il
ne reste qu'à remplacer `<StubPage />` par la vraie page, en lisant la base via `getDb()`.
Méthode détaillée : voir le [README racine](../README.md).
