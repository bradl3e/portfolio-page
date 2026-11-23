import Image from "next/image";
import hand from "@/public/images/brad/hand.png";
import footTop from "@/public/images/brad/fuss-oben.png";
import footBottom from "@/public/images/brad/fuss-unten.png";
import styles from "./brad.module.css";

/**
 * Bewegte Teile der Pixel-Szene: Hand an der Tastatur und beide Füsse. Der Hintergrund (pixel-szene.jpg)
 * enthält an diesen Stellen die Clean Plate, die Teile liegen im Ruhezustand deckungsgleich darüber.
 * Gehört in den relativen Bild-Container der Startseite. Rein dekorativ, Animation nur per CSS.
 */
export default function BradScene() {
  return (
    <span className={styles.scene} aria-hidden="true">
      <Image src={footBottom} alt="" loading="eager" className={`${styles.part} ${styles.footBottom}`} />
      <Image src={footTop} alt="" loading="eager" className={`${styles.part} ${styles.footTop}`} />
      <Image src={hand} alt="" loading="eager" className={`${styles.part} ${styles.hand}`} />
    </span>
  );
}
