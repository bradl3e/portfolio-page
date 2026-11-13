import Image from "next/image";
import Navigation from "@/components/Navigation";
import pixelSzene from "@/public/images/pixel-szene.jpg";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-between gap-6 p-4 sm:p-8 lg:p-16">
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        <header className="flex flex-col items-center text-center">
          <h1 className="text-5xl leading-none tracking-display sm:text-7xl lg:text-display-xl">
            Hallo, ich bin <span className="text-accent">Brad</span>
          </h1>
          <p className="max-w-intro text-lg text-text-secondary italic sm:text-lead">
            Ich bin Student an der Berner Fachhochschule und bin gerade an
            meinem Bachelor in Wirtschaftsinformatik dran
          </p>
        </header>
        <Image
          src={pixelSzene}
          alt="Pixel-Szene: Brad sitzt am Schreibtisch vor zwei Monitoren, neben ihm schläft eine weisse Katze im Sessel."
          preload
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="aspect-hero w-full max-w-hero object-cover"
        />
      </main>
      <Navigation current="/" />
    </div>
  );
}
