import Image from "next/image";
import { sprites, type SpriteName } from "./sprites";
import styles from "./cat.module.css";

type CatSpriteProps = {
  name: SpriteName;
  /** Nur für den Traveler: Bild sofort laden, da er sonst erst beim ersten Lauf nachlädt. */
  eager?: boolean;
};

/** Ein Sprite-Streifen in einem Rahmen, der genau einen Frame zeigt. Füllt sein Elternelement. */
export default function CatSprite({ name, eager = false }: CatSpriteProps) {
  const { image, frames, frameWidth, frameHeight, framesPerSecond } = sprites[name];
  return (
    <span
      className={`${styles.frame} ${name === "sleep" ? styles.breathing : ""}`}
      data-sprite={name}
      data-frames={frames}
      data-fps={framesPerSecond}
    >
      <Image
        src={image}
        width={frameWidth * frames}
        height={frameHeight}
        alt=""
        loading={eager ? "eager" : undefined}
        className={styles.strip}
      />
    </span>
  );
}
