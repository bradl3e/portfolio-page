import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Projekte", href: "/projekte" },
  { label: "Lebenslauf", href: "/lebenslauf" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export type NavHref = (typeof links)[number]["href"];

type NavigationProps = {
  /** href des aktiven Bereichs (Figma: Variante "Current"). */
  current: NavHref;
};

const base =
  "flex items-center justify-center rounded-full border border-border-strong px-6 py-4 font-mono text-label font-medium uppercase whitespace-nowrap transition-colors";
const active = "bg-action-bg text-action-text";
const inactive =
  "bg-bg-canvas text-text-primary hover:bg-action-bg hover:text-action-text";

export default function Navigation({ current }: NavigationProps) {
  return (
    <nav aria-label="Hauptnavigation">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={href === current ? "page" : undefined}
              className={`${base} ${href === current ? active : inactive}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
