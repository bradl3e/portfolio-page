import type { StaticImageData } from "next/image";
import aufwachen from "@/public/images/katze/aufwachen.png";
import rennen from "@/public/images/katze/rennen.png";
import schlafen from "@/public/images/katze/schlafen.png";
import sitzen from "@/public/images/katze/sitzen.png";

/**
 * Welche Bilddatei zu welcher Pose gehört. Vertrag: public/images/katze/<name>.png ist ein
 * horizontaler Streifen gleich grosser Frames, Pfoten auf der unteren Kante.
 * Zellgrösse, Frame-Anzahl, Tempo und Kopf-Anker stehen in cat.module.css (.sleep, .sit, .panic, .run),
 * dort werden sie beim Tauschen einer Datei mit angepasst.
 */
export type SpriteName = "sleep" | "sit" | "panic" | "run";

export const spriteImages: Record<SpriteName, StaticImageData> = {
  sleep: schlafen,
  sit: sitzen,
  panic: aufwachen,
  run: rennen,
};

/** Posen, in denen eine Katze auf einer Seite ruhen kann. */
export type RestPose = "sleep" | "sit";
