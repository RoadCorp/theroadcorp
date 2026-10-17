import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";

// Overpass descends from Highway Gothic, the US road-sign face.
const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://www.theroadcorp.com"
    : "http://localhost:3000");

const description =
  "RoadCorp is the company behind Avenews, Baylus, Bagaran, Lyóvson.com and Concerned EU. The Road to Infinity.";

export const metadata: Metadata = {
  title: {
    default: "RoadCorp",
    template: "%s | RoadCorp",
  },
  description,
  keywords: [
    "RoadCorp",
    "Avenews",
    "Baylus",
    "Bagaran",
    "Lyóvson",
    "Concerned EU",
  ],
  authors: [{ name: "RoadCorp" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "RoadCorp",
    title: "RoadCorp",
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoadCorp",
    description,
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1630",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "RoadCorp",
      url: siteUrl,
      logo: `${siteUrl}/apple-icon`,
      email: "contact@theroadcorp.com",
      slogan: "The Road to Infinity",
      description,
      sameAs: [
        "https://www.avenews.am",
        "https://www.baylus.am",
        "https://www.bagaranagency.com",
        "https://www.lyovson.com",
        "https://www.concernedeu.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "RoadCorp",
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" dir="ltr" lang="en">
      <body className={`${overpass.variable} font-sans antialiased`}>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from constants
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  );
}
