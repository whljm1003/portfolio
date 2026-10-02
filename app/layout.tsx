import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

const barlow = localFont({
  src: "../public/fonts/BarlowCondensed-Bold.ttf",
  variable: "--font-barlow",
  weight: "700",
  display: "swap",
});

const siteUrl = "https://portfolio-whljm1003.vercel.app";
const title = "DEAN · 이정민 | 프론트엔드 개발자";
const description =
  "프론트엔드 개발자 이정민입니다. React, Next.js, TypeScript를 활용한 웹 개발과 React Native 앱 개발 경험을 바탕으로 제품의 문제를 해결하고 사용자 경험을 개선한 과정을 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | DEAN · 이정민",
  },
  description,
  keywords: [
    "이정민",
    "DEAN",
    "프론트엔드 개발자",
    "포트폴리오",
    "오피스너",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Fastlane",
    "Sentry",
  ],
  authors: [{ name: "이정민" }],
  creator: "이정민",
  publisher: "이정민",
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
    locale: "ko_KR",
    siteName: "DEAN · 이정민",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: `${siteUrl}/` },
  verification: {
    google: "Urb-UAfsYQ7F8GUktYxf0iccYuqK6dTOu_bnIUNdFc0",
    other: {
      "naver-site-verification": "e0fc47427133c069fe2d0d678d59f55cbd73b4e4",
    },
  },
  category: "portfolio",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E8E4D9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${barlow.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          본문 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
