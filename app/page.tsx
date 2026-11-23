import Image from "next/image";
import CatSpot from "@/components/cat/CatSpot";
import PageShell from "@/components/PageShell";
import pixelSzene from "@/public/images/pixel-szene.jpg";

export default function Home() {
  return (
    <PageShell current="/" className="gap-4">
      <header className="flex flex-col items-center text-center">
        <h1 className="font-display text-5xl leading-none tracking-display sm:text-display-hero">
          Hallo, ich bin <span className="text-accent">Brad</span>
        </h1>
        <p className="max-w-intro text-lead text-text-secondary italic">
          Ich bin Student an der Berner Fachhochschule und bin gerade an
          meinem Bachelor in Wirtschaftsinformatik dran
        </p>
      </header>
      <div className="relative aspect-hero w-full max-w-hero">
        <Image
          src={pixelSzene}
          alt="Pixel-Szene: Brad sitzt am Schreibtisch vor zwei Monitoren, neben ihm schläft eine weisse Katze im Sessel."
          preload
          sizes="(min-width: 1024px) 963px, 100vw"
          className="size-full object-cover"
        />
        <CatSpot pose="sleep" place="home-scene" />
      </div>
    </PageShell>
  );
}
