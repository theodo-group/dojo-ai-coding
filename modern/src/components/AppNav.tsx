"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="w-60 shrink-0 border-r border-gray-200 bg-white px-3 py-6">
      {NAV.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? "bg-tomato-50 font-semibold text-tomato-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
