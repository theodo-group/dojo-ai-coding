# Dojo AI Coding — Migration Ketchup Compta

Repo-exercice pédagogique : des élèves ingénieurs apprennent à migrer une application
legacy vers une stack moderne **en utilisant Claude Code**. L'application support est
**Ketchup Compta**, un logiciel de comptabilité en partie double.

## Language

**Legacy**:
L'application PHP d'origine (Ketchup Compta), telle quelle, dans le dossier `legacy/`.
_Avoid_: l'ancien code, le code source, v1

**Modern**:
L'application cible en Next.js, dans le dossier `modern/`. À la livraison de l'exercice,
elle ne contient que le squelette (pas les pages métier).
_Avoid_: la nouvelle app, le front, app-nextjs

**Squelette**:
Le périmètre livré dans `modern/` au démarrage de l'exercice : page d'accueil, login,
logout, navigation interne et dashboard vide. Démontre les patterns sans le métier.
_Avoid_: le starter, le boilerplate, le template

**Page métier**:
Une page qui porte de la logique comptable (écritures, états, plan comptable…). Hors
périmètre du squelette ; c'est ce que l'apprenant migre lui-même avec Claude Code.
_Avoid_: page fonctionnelle, feature

**Apprenant**:
L'élève ingénieur qui suit le tutoriel (README racine) et migre les pages métier avec
Claude Code. Découvre le web, n'a pas d'environnement de dev installé.
_Avoid_: l'utilisateur, l'étudiant, le dev

## Relationships

- Le **Squelette** vit dans **Modern** et sert de modèle de référence à l'**Apprenant**
- L'**Apprenant** migre les **Pages métier** depuis **Legacy** vers **Modern** avec Claude Code
- **Modern** a sa propre base SQLite, générée à partir des mêmes scripts SQL (schéma + seed) que **Legacy** — pas de fichier partagé, pas de Docker côté Modern

## Example dialogue

> **Concepteur :** « Le **Squelette** inclut-il une page d'écritures vide ? »
> **Porteur de l'exo :** « Non — toute **Page métier** est hors squelette. Le squelette
> ne montre que l'accueil, le login/logout, la nav et un dashboard vide. Les écritures,
> c'est l'**Apprenant** qui les migre avec Claude Code en s'inspirant de ces patterns. »

## Flagged ambiguities

- « l'app » était ambigu entre **Legacy** et **Modern** — résolu : on dit toujours
  **Legacy** (`legacy/`) ou **Modern** (`modern/`).
</content>
</invoke>
