import CatSprite from "./CatSprite";
import type { RestPose } from "./sprites";
import styles from "./cat.module.css";

type CatSpotProps = {
  pose: RestPose;
  /** "home-scene": absolut im Bild der Startseite. "beside-title": im Textfluss, unter sm ausgeblendet. */
  place: "home-scene" | "beside-title";
};

/**
 * Stelle, an der die Katze auf dieser Seite ruht. Statisch gerendert (auch ohne JavaScript);
 * der CatTraveler findet sie über data-cat-spot und läuft dorthin.
 */
export default function CatSpot({ pose, place }: CatSpotProps) {
  const placeClass = place === "home-scene" ? styles.placeHomeScene : styles.placeBesideTitle;
  return (
    <span className={`${styles.spot} ${styles[pose]} ${placeClass}`} data-cat-spot data-cat-pose={pose} aria-hidden="true">
      {/* eager: Nach der Ankunft wird der Spot sofort sichtbar, ein lazy Bild würde kurz fehlen. */}
      <CatSprite name={pose} eager />
    </span>
  );
}
