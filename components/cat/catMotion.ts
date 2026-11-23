/** Hilfsfunktionen für den CatTraveler: Messen, Dauer und Medienabfragen. */
import type { RestPose } from "./sprites";

/**
 * Bildschirmposition und Grösse des Traveler-Rahmens in Viewport-Pixeln. Der Rahmen hat die Grösse
 * der schlafenden Katze (Referenzzelle); Pfoten-Grundlinie und Mittellinie stimmen mit dem Spot überein.
 */
export type CatBox = { x: number; y: number; w: number; h: number };

/** Wo die Katze gerade ruht ("run" = wurde mitten auf der Reise unterbrochen, ist also wach). */
export type CatSpotReading = CatBox & { pose: RestPose | "run" };

export const RUN_SPEED_PX_PER_SECOND = 700;
export const RUN_MIN_MS = 350;
/** Dauer der Panik-Phase. Muss zu --cycle in .panic (cat.module.css) passen: Der Panik-Streifen läuft genau so lange einmal ab. */
export const PANIC_MS = 700;
export const ARRIVE_MS = 300;

/** Gleicher Wert wie der Breakpoint "sm" in cat.module.css. */
const MIN_TRAVEL_WIDTH = "(min-width: 640px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function canTravel(): boolean {
  return window.matchMedia(MIN_TRAVEL_WIDTH).matches && !window.matchMedia(REDUCED_MOTION).matches;
}

/** Misst den Ruheplatz der aktuellen Seite. null, wenn es keinen gibt oder er ausgeblendet ist. */
export function readSpot(): CatSpotReading | null {
  // Pro Seite gibt es genau einen sichtbaren Spot; ausgeblendete (width 0) werden übersprungen.
  const spots = document.querySelectorAll<HTMLElement>("[data-cat-spot]");
  let spot: HTMLElement | undefined;
  let rect: DOMRect | undefined;
  for (const candidate of spots) {
    const candidateRect = candidate.getBoundingClientRect();
    if (candidateRect.width > 0) {
      spot = candidate;
      rect = candidateRect;
      break;
    }
  }
  if (!spot || !rect) return null;
  const pose = spot.dataset.catPose === "sit" ? "sit" : "sleep";
  // Gemeinsamer Massstab: Sprite-Pixel -> Bildschirm-Pixel, aus der Breite des Spots.
  // Zellmasse stehen nur in cat.module.css und werden hier aus den CSS-Variablen gelesen.
  const css = getComputedStyle(spot);
  const cssNumber = (name: string) => parseFloat(css.getPropertyValue(name));
  const scale = rect.width / cssNumber("--cell-w");
  const w = cssNumber("--ref-w") * scale;
  const h = cssNumber("--ref-h") * scale;
  // Fehlt eine CSS-Variable (NaN) oder ist die Breite 0, lieber "kein Spot" als eine kaputte Reise.
  if (![rect.width, w, h].every(Number.isFinite) || w <= 0) return null;
  return {
    // Mittellinie und Unterkante des Spots bleiben, egal wie gross die Zelle der Pose ist.
    x: rect.left + rect.width / 2 - w / 2,
    y: rect.bottom - h,
    w,
    h,
    pose,
  };
}

export function runDurationMs(from: CatBox, to: CatBox): number {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  return Math.max(RUN_MIN_MS, (distance / RUN_SPEED_PX_PER_SECOND) * 1000);
}

/** transform für Web Animations: oben links verschieben, Grösse relativ zur Startgrösse skalieren. */
export function transformFor(box: CatBox, baseWidth: number): string {
  return `translate(${box.x}px, ${box.y}px) scale(${baseWidth > 0 ? box.w / baseWidth : 1})`;
}
