import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: switch to https://issaahmed.com once the custom domain is wired up
const SITE_URL = "https://issaahmed-com.vercel.app";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Issa Ahmed — Mechatronics & AI Systems Engineering",
    template: "%s · Issa Ahmed",
  },
  description:
    "Mechatronics & AI Systems Engineering student at Western University. I build autonomous robots, applied ML systems, and full-stack tools. Currently Product Engineer at Scooty Mobility.",
  keywords: [
    "Issa Ahmed",
    "Mechatronics",
    "AI Systems",
    "Robotics",
    "Reinforcement Learning",
    "ROS2",
    "Machine Learning",
    "Western University",
  ],
  authors: [{ name: "Issa Ahmed" }],
  creator: "Issa Ahmed",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Issa Ahmed — Mechatronics & AI Systems Engineering",
    description:
      "Autonomous robots, applied ML, and full-stack systems. Western University · Class of 2026.",
    siteName: "Issa Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issa Ahmed — Mechatronics & AI Systems Engineering",
    description:
      "Autonomous robots, applied ML, and full-stack systems. Western University · Class of 2026.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Issa Ahmed",
              jobTitle: "Mechatronics & AI Systems Engineering Student",
              url: SITE_URL,
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Western University",
              },
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
