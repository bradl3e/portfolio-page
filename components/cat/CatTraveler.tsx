"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import CatSprite from "./CatSprite";
import {
  ARRIVE_MS,
  PANIC_MS,
  canTravel,
  readSpot,
  runDurationMs,
  transformFor,
  type CatBox,
  type CatSpotReading,
} from "./catMotion";
import styles from "./cat.module.css";

/** Zustände aus Issue #8. Sichtbar ist der Traveler nur ausserhalb von "resting". */
type CatState = "resting" | "panicking" | "running" | "arriving";

const TRAVELING_ATTRIBUTE = "data-cat-traveling";

/**
 * Die Katze, die beim Seitenwechsel vom alten zum neuen Ruheplatz (CatSpot) rennt.
 * Der Seitenwechsel selbst wird nie gebremst: Die Animation läuft nur daneben.
 */
export default function CatTraveler() {
  const pathname = usePathname();
  const travelerRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);
  // Wo die Katze zuletzt gesehen wurde. Nach dem Seitenwechsel ist die alte Seite weg,
  // darum wird die Position schon vorher mitgeführt (siehe zweiten Effect).
  const lastSeen = useRef<CatSpotReading | null>(null);
  const state = useRef<CatState>("resting");
  const timer = useRef<number | undefined>(undefined);
  const animation = useRef<Animation | undefined>(undefined);

  // Einmalig: Frame-Anzahl und Zyklusdauer aus sprites.ts (über data-Attribute) in CSS übertragen.
  useLayoutEffect(() => {
    const traveler = travelerRef.current;
    if (!traveler) return;
    traveler.querySelectorAll<HTMLElement>("[data-sprite]").forEach((sprite) => {
      const frames = Number(sprite.dataset.frames);
      const fps = Number(sprite.dataset.fps);
      // Gleiche Begründung wie unten: Custom Properties statt style=.
      sprite.style.setProperty("--frames", String(frames));
      sprite.style.setProperty("--cycle", `${frames / fps}s`);
    });
    return () => document.documentElement.removeAttribute(TRAVELING_ATTRIBUTE);
  }, []);

  // Position der ruhenden Katze passiv aktuell halten (Scroll, Resize, Laden).
  useLayoutEffect(() => {
    const track = () => {
      if (state.current === "resting") lastSeen.current = readSpot();
    };
    track();
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track, { passive: true });
    window.addEventListener("load", track);
    return () => {
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
      window.removeEventListener("load", track);
    };
  }, []);

  // Bei jedem Routenwechsel: von lastSeen zum neuen Spot reisen.
  useLayoutEffect(() => {
    const traveler = travelerRef.current;
    if (!traveler) return;

    const setState = (next: CatState) => {
      state.current = next;
      traveler.dataset.state = next;
      if (next === "resting") document.documentElement.removeAttribute(TRAVELING_ATTRIBUTE);
      else document.documentElement.setAttribute(TRAVELING_ATTRIBUTE, "");
    };

    /** Stoppt Timer und Animation, ohne den Zustand zu ändern. */
    const stop = () => {
      window.clearTimeout(timer.current);
      animation.current?.cancel();
      animation.current = undefined;
    };

    const rest = () => {
      stop();
      setState("resting");
      lastSeen.current = readSpot();
    };

    // Erster Durchlauf und erneutes Ausführen derselben Route (React Strict Mode): keine Reise.
    if (previousPathname.current === pathname) {
      return;
    }
    previousPathname.current = pathname;

    const from = lastSeen.current;
    const target = readSpot();
    lastSeen.current = target;

    if (!canTravel() || (!from && !target)) {
      rest();
      return;
    }

    // Ohne alten Spot kommt die Katze von rechts herein, ohne neuen läuft sie rechts hinaus.
    const offscreenX = window.innerWidth;
    const start: CatBox = from ?? { ...target!, x: offscreenX };
    const end: CatBox = target ?? { ...start, x: offscreenX };

    // Dynamische Mess-Werte: style= ist per ESLint verboten, darum CSS-Custom-Properties über die Ref.
    traveler.style.setProperty("--cat-w", `${start.w}px`);
    traveler.style.setProperty("--cat-h", `${start.h}px`);
    traveler.style.setProperty("--cat-x", `${start.x}px`);
    traveler.style.setProperty("--cat-y", `${start.y}px`);
    traveler.dataset.facing = end.x < start.x ? "left" : "right";

    const glide = (to: CatBox, duration: number, easing: string, onDone: () => void) => {
      const move = traveler.animate(
        [{ transform: transformFor(start, start.w) }, { transform: transformFor(to, start.w) }],
        { duration, easing, fill: "forwards" },
      );
      animation.current = move;
      move.onfinish = () => {
        // Verspäteter Callback einer schon ersetzten Animation: ignorieren.
        if (animation.current !== move) return;
        onDone();
      };
    };

    const arrive = () => {
      setState("arriving");
      // Neu messen: Next setzt die Scrollposition evtl. erst nach unserem Start zurück.
      const settled = readSpot() ?? end;
      stop();
      const settleAnim = traveler.animate(
        [{ transform: transformFor(end, start.w) }, { transform: transformFor(settled, start.w) }],
        { duration: ARRIVE_MS, easing: "ease-out", fill: "forwards" },
      );
      animation.current = settleAnim;
      settleAnim.onfinish = () => {
        if (animation.current !== settleAnim) return;
        rest();
      };
    };

    const run = () => {
      setState("running");
      glide(end, runDurationMs(start, end), "linear", target ? arrive : rest);
    };

    // Eine schlafende Katze erschrickt zuerst; eine wache (oder unterbrochene) rennt sofort los.
    if (from?.pose === "sleep") {
      setState("panicking");
      timer.current = window.setTimeout(run, PANIC_MS);
    } else {
      run();
    }

    // Interrupt: Bei neuer Route die aktuelle Position der laufenden Katze merken,
    // dann alles abbrechen. Der nächste Durchlauf startet von dort.
    return () => {
      if (state.current !== "resting") {
        const { left, top, width, height } = traveler.getBoundingClientRect();
        // Breite/Höhe 0 = Traveler ausgeblendet (display:none), dann gilt der Spot der Seite.
        lastSeen.current =
          width > 0 && height > 0
            ? { x: left, y: top, w: width, h: height, pose: "run" }
            : readSpot();
      }
      stop();
    };
  }, [pathname]);

  return (
    <div ref={travelerRef} className={styles.traveler} data-state="resting" aria-hidden="true">
      <div className={styles.flipper}>
        <div className={`${styles.sprite} ${styles.spritePanic}`}>
          <CatSprite name="panic" eager />
        </div>
        <div className={`${styles.sprite} ${styles.spriteRun}`}>
          <CatSprite name="run" eager />
        </div>
      </div>
    </div>
  );
}
