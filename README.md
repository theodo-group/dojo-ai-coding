# 🍅 Dojo AI Coding — Migrer une appli legacy avec Claude Code

TP de 2 h : tu pars d'une vieille application PHP (**Ketchup Compta**, un logiciel de
comptabilité) et tu la **migres vers une application moderne en Next.js**, en laissant
Claude Code faire le gros du travail. Tu ne codes pas tout toi-même : tu **pilotes**.

À la fin tu sauras reproduire, seul, une méthode de migration assistée par IA.

```
.
├── legacy/    ← l'ancienne appli (PHP, à NE PAS modifier — c'est la référence)
└── modern/    ← la nouvelle appli (Next.js) — squelette prêt, pages métier à migrer
```

---

## 1. Prérequis

1. **Claude Code Desktop** — télécharge l'application (macOS / Windows), installe-la et connecte-toi : https://claude.com/claude-code
2. **Node.js 24+** (LTS) — https://nodejs.org → nécessaire pour lancer l'appli moderne (`npm run dev`).

Récupère ensuite ce projet, puis **ouvre le dossier dans Claude Code Desktop** : c'est là que tu lanceras les commandes (`/grill-with-docs`, `/to-prd`, …).

```bash
git clone https://github.com/theodo-group/dojo-ai-coding.git
```

> Docker est **optionnel** : il ne sert qu'à voir tourner l'ancienne appli `legacy/`.
> `modern/` n'a besoin que de Node.

---

## 2. Découvrir l'application à migrer

L'ancienne appli (facultatif, si tu as Docker) :

```bash
cd legacy
docker-compose up -d
open http://localhost:8080   # login : admin / admin123
```

Clique partout : tableau de bord, écritures, états, admin. **C'est ce produit qu'on remet à neuf.**
Si tu n'as pas Docker, ouvre les fichiers `legacy/www/` — c'est lisible.

---

## 3. Lancer le squelette moderne

```bash
cd modern
npm install
npm run dev        # http://localhost:3000  — login : admin / admin123
```

Tu obtiens déjà : page d'accueil, connexion/déconnexion, navigation, tableau de bord.
Les pages métier affichent « 🚧 Page à migrer » : **ce sont les emplacements à remplir.**
La base SQLite est créée automatiquement au premier lancement, à partir des mêmes
données que le legacy.

---

## 4. La méthode de migration (à appliquer page par page)

Pour **chaque page**, dans **Claude Code Desktop** (le projet ouvert, en travaillant dans `modern/`), on enchaîne 4 temps :

| Étape | Commande | Ce qui se passe |
|------|-----------|-----------------|
| 1. Cadrer | `/grill-with-docs` | L'IA te pose toutes les questions sur la page (comportement, champs, règles). Tu réponds. |
| 2. Spécifier | `/to-prd` | L'IA résume la discussion en une spec concise (`docs/issues/<page>/PRD.md`). |
| 3. Découper | `/to-issues` | L'IA découpe la spec en petits tickets indépendants. |
| 4. Implémenter | (demande simple) | « Implémente le ticket 01 » → puis le 02, etc. |

**Valider le travail** (à chaque page) :
1. `npm run dev`, ouvre la page migrée, et **compare-la à la même page du legacy**.
2. Coche les critères d'acceptation du ticket.
3. *(bonus)* demande à Claude Code de lancer l'appli et de vérifier lui-même.

> 💡 Esprit du TP : tu **décris** ce que tu veux et tu **vérifies**. Laisse l'IA écrire le code.

---

## 5. L'ordre de migration (du plus simple au plus costaud)

La navigation de `modern/` est ta feuille de route. On migre dans cet ordre :

1. **Société** ← *on la fait ensemble en exemple* (un formulaire : lire + enregistrer)
2. **Utilisateurs** (liste, puis création/édition)
3. **Journaux** (petite liste)
4. **Plan comptable** (liste de comptes)
5. **Écritures** (liste, puis « Nouvelle écriture » — la plus complexe : partie double)
6. **États** : Grand livre, Balance, Journal (calculs et totaux)

---

## 6. Exemple guidé : la page « Société »

Dans **Claude Code Desktop**, lance :

```
/grill-with-docs migrer la page Société depuis legacy/www/modules/setup/company.php
```

Réponds aux questions, puis :

```
/to-prd
/to-issues
```

Puis implémente les tickets un par un (« implémente le ticket 01 »), lance `npm run dev`,
ouvre **/admin/societe**, et compare au legacy. Quand ça correspond : page migrée ✅.

---

## 7. À toi de jouer

Refais exactement la même boucle pour les pages suivantes (Utilisateurs, Journaux, …).
Tu n'auras probablement pas le temps de tout finir en 2 h — l'important est de **maîtriser
la méthode**. Le reste des pages est ton terrain d'entraînement.

---

### Pour aller plus loin
- `modern/README.md` — comment le squelette est construit (auth, navigation, base de données).
- `legacy/README.md` — comment fonctionne l'ancienne appli.
