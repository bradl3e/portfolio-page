import type { Metadata } from "next";
import AlbumCard from "@/components/AlbumCard";
import PageShell from "@/components/PageShell";
import cover01 from "@/public/images/projekt-01-cover.jpg";
import cover02 from "@/public/images/projekt-02-cover.jpg";

export const metadata: Metadata = {
  title: "Projekte – Brad",
};

// Titel sind Platzhalter aus dem Figma-Frame "HF – Projekte".
const projects = [
  {
    number: "01",
    title: "Projekt 01 – Titel",
    cover: {
      src: cover01,
      alt: "Lego-Figuren von Batman und Joker kämpfen auf einer Alpwiese mit Kühen vor dem Matterhorn.",
    },
  },
  {
    number: "02",
    title: "Projekt 02 – Titel",
    cover: {
      src: cover02,
      alt: "Diagramm „RAG (Retrieval-Augmented Generation) System Overview“ mit Indexing- und Retrieval-Phase.",
    },
  },
  { number: "03", title: "Projekt 03 – Titel" },
  { number: "04", title: "Projekt 04 – Titel" },
];

export default function Projekte() {
  return (
    <PageShell current="/projekte" className="gap-16">
      <h1 className="font-display text-display-l">Projekte</h1>
      <ul className="group/track grid w-full max-w-track grid-cols-2 gap-8 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.number}>
            <AlbumCard href={`/projekte/${project.number}`} {...project} />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
