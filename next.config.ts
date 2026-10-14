import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Erstellt eine reine HTML-Version im Ordner "out", die GitHub Pages anzeigen kann
  output: "export",
  // Der Repo-Name, damit die Seite unter /portfolio-page/ läuft
  basePath: "/portfolio-page",
  // GitHub Pages kann die Bildoptimierung von Next.js nicht ausführen
  images: { unoptimized: true },
};

export default nextConfig;
