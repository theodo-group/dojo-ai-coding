/** Arborescence de navigation, calquée sur le menu du legacy. */

export type NavLink = { href: string; label: string };
export type NavSection = { title: string; links: NavLink[] };

export const NAV: NavSection[] = [
  {
    title: "Général",
    links: [{ href: "/dashboard", label: "Tableau de bord" }],
  },
  {
    title: "Écritures",
    links: [
      { href: "/ecritures/nouvelle", label: "Nouvelle écriture" },
      { href: "/ecritures", label: "Toutes les écritures" },
    ],
  },
  {
    title: "États",
    links: [
      { href: "/etats/grand-livre", label: "Grand livre" },
      { href: "/etats/balance", label: "Balance" },
      { href: "/etats/journal", label: "Journal" },
    ],
  },
  {
    title: "Admin",
    links: [
      { href: "/admin/societe", label: "Société" },
      { href: "/admin/plan-comptable", label: "Plan comptable" },
      { href: "/admin/journaux", label: "Journaux" },
      { href: "/admin/utilisateurs", label: "Utilisateurs" },
    ],
  },
];
