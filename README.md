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

Pas besoin d'être technique : tu n'installes **qu'une seule chose toi-même**, Claude Code
Desktop. C'est lui qui s'occupe du reste (Node.js, récupération du projet, lancement).

1. **Installe Claude Code Desktop** — télécharge l'application (macOS / Windows),
   installe-la et connecte-toi : https://claude.com/claude-code
2. **Crée un dossier vide** quelque part de facile à retrouver — par exemple un dossier
   `dojo` sur ton **Bureau**.
3. **Ouvre ce dossier dans Claude Code Desktop** (bouton « Open folder » / « Ouvrir un dossier »).
4. **Copie-colle ce message** dans Claude Code Desktop, puis laisse-le travailler. Il te
   demandera l'autorisation d'exécuter des commandes → **accepte** :

   > Installe Node.js version 24 ou plus si je ne l'ai pas déjà, de la manière la plus
   > simple pour ma machine. Ensuite, clone le dépôt
   > `https://github.com/theodo-group/dojo-ai-coding.git` dans ce dossier, installe les
   > dépendances de `modern/` puis lance l'appli. Explique-moi au fur et à mesure ce que
   > tu fais, en français.

Quand l'appli tourne, ouvre **http://localhost:3000** dans ton navigateur (login :
`admin` / `admin123`). Puis, dans Claude Code Desktop, **ouvre le dossier
`dojo-ai-coding`** qui vient d'être cloné : c'est là que se passe toute la suite.

> Docker est **optionnel** : il ne sert qu'à voir tourner l'ancienne appli `legacy/`.
> `modern/` n'a besoin que de Node (que Claude Code vient d'installer pour toi).

---

## 2. (Optionnel) Voir tourner l'ancienne application

C'est l'ancienne appli (dossier `legacy/`) que tu vas moderniser. La faire tourner en local
est **facultatif** : c'est sympa de la voir vivre, mais **si ça ne marche pas, ne perds pas
de temps — passe directement à la suite.** Tu peux de toute façon lire son code dans
`legacy/` quand tu veux, et comparer page par page pendant la migration.

Elle se lance avec **Docker**. Copie-colle ce message dans Claude Code Desktop :

> Fais tourner l'ancienne application du dossier `legacy/` avec Docker (installe Docker
> Desktop si je ne l'ai pas). Démarre-la et donne-moi l'adresse à ouvrir dans mon
> navigateur. Explique-moi au fur et à mesure, en français.

Ouvre ensuite l'adresse indiquée (en général **http://localhost:8080**, login `admin` /
`admin123`) et clique partout : tableau de bord, écritures, états, admin.
**C'est ce produit qu'on remet à neuf.**

> ⚠️ Si l'installation de Docker ou le démarrage coince : **laisse tomber et continue le
> tuto.** Voir tourner la legacy n'est pas nécessaire pour la migrer.

<details>
<summary>Le lancer à la main</summary>

```bash
cd legacy
docker-compose up -d         # nécessite Docker
# puis ouvre http://localhost:8080
```

</details>

---

## 3. Le squelette moderne

Claude Code a déjà lancé l'appli à l'étape 1. Pour la **relancer** plus tard (ou si tu veux
le faire toi-même), demande-le simplement à Claude Code, ou lance :

```bash
cd modern
npm install        # la première fois seulement
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
