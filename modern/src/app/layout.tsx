import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ketchup Compta",
  description: "Logiciel de comptabilité en partie double — version moderne (Next.js)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
