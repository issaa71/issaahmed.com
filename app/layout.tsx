import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SheetFrame } from "./_components/drafting";

// Archivo — structure/display face. The `wdth` axis powers the extended
// (.wide) treatment on the hero name and sheet titles.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

// Source Serif 4 — body prose. `opsz` optical-size axis for large display prose.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  axes: ["opsz"],
});

// IBM Plex Mono — annotations, labels, data tables (non-variable → weights).
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

// TODO: switch to https://issaahmed.com once the custom domain is wired up
const SITE_URL = "https://issaahmed-com.vercel.app";

export const viewport: Viewport = {
  themeColor: "#faf7f0",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Issa Ahmed — Robotics, ML & Full-Stack Projects",
    template: "%s · Issa Ahmed",
  },
  description:
    "Robotics, applied ML, and full-stack projects — designed, built, and shipped, with three running live in your browser.",
  keywords: [
    "Issa Ahmed",
    "Robotics",
    "Reinforcement Learning",
    "ROS2",
    "Machine Learning",
    "Computer Vision",
    "Full-stack engineering",
  ],
  authors: [{ name: "Issa Ahmed" }],
  creator: "Issa Ahmed",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Issa Ahmed — Robotics, ML & Full-Stack Projects",
    description:
      "Autonomous robots, applied ML, and full-stack systems — built, shipped, and three of them live in your browser.",
    siteName: "Issa Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issa Ahmed — Robotics, ML & Full-Stack Projects",
    description:
      "Autonomous robots, applied ML, and full-stack systems — built, shipped, and three of them live in your browser.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Issa Ahmed",
              url: SITE_URL,
              knowsAbout: [
                "Robotics",
                "ROS2",
                "Computer Vision",
                "Reinforcement Learning",
                "Machine Learning",
                "Full-stack engineering",
              ],
              sameAs: [
                "https://github.com/issaa71",
                "https://www.linkedin.com/in/issa-ahmed-032490190/",
              ],
            }),
          }}
        />
        <SheetFrame />
        {children}
      </body>
    </html>
  );
}
