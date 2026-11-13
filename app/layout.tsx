import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import GalaxyBackground from "@/components/GalaxyBackground";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Brad – Portfolio",
  description:
    "Portfolio von Brad, Student der Wirtschaftsinformatik an der Berner Fachhochschule.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-serif">
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}
