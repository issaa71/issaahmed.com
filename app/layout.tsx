import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fraunces is a variable font — warm, editorial display face for the light gallery.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

// TODO: switch to https://issaahmed.com once the custom domain is wired up
const SITE_URL = "https://issaahmed-com.vercel.app";

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Issa Ahmed — Robotics, ML & Full-Stack Projects",
    template: "%s · Issa Ahmed",
  },
  description:
    "Robotics, applied ML, and full-stack projects — designed, built, and shipped, with two running live in your browser.",
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
      "Autonomous robots, applied ML, and full-stack systems — built, shipped, and two of them live in your browser.",
    siteName: "Issa Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issa Ahmed — Robotics, ML & Full-Stack Projects",
    description:
      "Autonomous robots, applied ML, and full-stack systems — built, shipped, and two of them live in your browser.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
        <noscript>
          <style>{`.reveal-hidden{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
