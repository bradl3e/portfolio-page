import Image from "next/image";
import { spriteImages, type SpriteName } from "./sprites";
import styles from "./cat.module.css";

type CatSpriteProps = {
  name: SpriteName;
  /** Sofort laden: Traveler (sonst erst beim ersten Lauf) und Spots (sofort sichtbar nach der Ankunft). */
  eager?: boolean;
};

/** Ein Sprite-Streifen in einem Rahmen, der genau einen Frame zeigt. Füllt sein Elternelement. */
export default function CatSprite({ name, eager = false }: CatSpriteProps) {
  const image = spriteImages[name];
  return (
    <span className={`${styles.frame} ${styles[name]} ${name === "sleep" ? styles.breathing : ""}`}>
      <Image
        src={image}
        width={image.width}
        height={image.height}
        alt=""
        loading={eager ? "eager" : undefined}
        className={styles.strip}
      />
    </span>
  );
}
