import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type AlbumCardProps = {
  href: string;
  title: string;
  /** Wird angezeigt, solange das Projekt kein Cover hat (Figma: "Nummer anzeigen"). */
  number: string;
  cover?: { src: StaticImageData; alt: string };
};

/**
 * Album im Projekte-Raster (Figma: "Album Card").
 * Hover/Fokus: Das Cover wächst von 344 auf 376 px, indem das Padding im
 * gleich grossen Slot wegfällt. So verschiebt sich das Layout nicht.
 * Die übrigen Alben dunkeln auf 45 % ab; dafür muss die umgebende Liste die
 * Klasse "group/track" tragen.
 */
export default function AlbumCard({ href, title, number, cover }: AlbumCardProps) {
  return (
    <Link
      href={href}
      className="group/album flex flex-col items-center gap-4 transition-opacity duration-300 group-has-[a:hover]/track:not-hover:opacity-45"
    >
      <span className="block aspect-square w-full p-4 transition-[padding] duration-300 group-hover/album:p-0 group-focus-visible/album:p-0">
        <span className="relative flex size-full items-center justify-center overflow-hidden bg-bg-raised">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1728px) 376px, (min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span aria-hidden="true" className="text-display-xl text-text-secondary">
              {number}
            </span>
          )}
        </span>
      </span>
      <span className="font-mono text-label font-medium text-text-primary uppercase transition-colors duration-300 group-hover/album:text-accent group-focus-visible/album:text-accent">
        {title}
      </span>
    </Link>
  );
}
