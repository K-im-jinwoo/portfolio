import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const title = "김진우 | 업무 자동화 개발자";
const description =
  "업무 시스템과 AI 워크플로로 반복 업무와 운영 병목을 개선하는 개발자 김진우의 포트폴리오";
const configuredOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function getMetadataBase() {
  try {
    const origin = new URL(configuredOrigin);
    if (origin.protocol !== "http:" && origin.protocol !== "https:") {
      throw new Error("Unsupported site URL protocol");
    }
    return origin;
  } catch {
    return new URL("http://localhost:3000");
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
        alt: "김진우 업무 자동화 개발자",
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
