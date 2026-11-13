import Image from "next/image";
import galaxy from "@/public/images/galaxy-background.svg";

/** Sternenhimmel als unterste Ebene aller Seiten (Figma: "Galaxy Background"). */
export default function GalaxyBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src={galaxy}
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
