import type { StaticImageData } from "next/image";
import schlafen from "@/public/images/katze/schlafen.png";

/**
 * Zentrale Sprite-Konfiguration. Vertrag für die echten Streifen:
 * public/images/katze/<name>.png, ein horizontaler Streifen gleich grosser Frames,
 * Pfoten auf der unteren Kante. Später nur Datei + Werte hier tauschen.
 *
 * Ruhe-Posen (sleep, sit) MÜSSEN genau ein Frame haben: Nur der CatTraveler setzt --frames/--cycle,
 * Spot-Katzen hätten bei mehreren Frames keine Variablen und damit keine Animation.
 * Ruhe-Posen (sleep, sit) sind genau ein Frame; das Atmen kommt per CSS.
 * Frame-Animationen (panic, run) werden nur vom CatTraveler abgespielt.
 */
export type SpriteName = "sleep" | "sit" | "panic" | "run";

export type Sprite = {
  image: StaticImageData;
  frames: number;
  frameWidth: number;
  frameHeight: number;
  framesPerSecond: number;
};

// Vorläufig ist überall dasselbe Bild eingetragen (1 Frame, 424 x 304).
const placeholder = {
  image: schlafen,
  frames: 1,
  frameWidth: 424,
  frameHeight: 304,
  framesPerSecond: 8,
} satisfies Sprite;

export const sprites: Record<SpriteName, Sprite> = {
  sleep: placeholder,
  sit: placeholder,
  panic: placeholder,
  run: placeholder,
};

/** Posen, in denen eine Katze auf einer Seite ruhen kann. */
export type RestPose = "sleep" | "sit";
