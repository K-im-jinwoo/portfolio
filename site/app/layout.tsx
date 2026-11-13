import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";
import "./globals.css";

const title = `${profile.nameKo} | ${profile.role}`;
const description = profile.intro;
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;

function getMetadataBase() {
  if (!configuredOrigin) return undefined;

  try {
    const origin = new URL(configuredOrigin);
    const isLocal = origin.hostname === "localhost";
    if (origin.protocol !== "https:" && !isLocal) {
      throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS");
    }
    return origin;
  } catch (error) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid trusted origin", {
      cause: error,
    });
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.nameKo} ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
