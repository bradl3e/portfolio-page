import type { Metadata } from "next";
import { DM_Mono, Familjen_Grotesk, Iosevka_Charon_Mono } from "next/font/google";
import CatTraveler from "@/components/cat/CatTraveler";
import GalaxyBackground from "@/components/GalaxyBackground";
import "./globals.css";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
});

const iosevkaCharonMono = Iosevka_Charon_Mono({
  variable: "--font-iosevka-charon-mono",
  subsets: ["latin"],
  weight: "400",
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
      className={`${familjenGrotesk.variable} ${dmMono.variable} ${iosevkaCharonMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <GalaxyBackground />
        {children}
        <CatTraveler />
      </body>
    </html>
  );
}
