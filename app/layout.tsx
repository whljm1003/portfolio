import { Viewport } from "next";
import "../styles/globals.css";
import "swiper/css";

export const metadata = {
  title: "이정민 포트폴리오",
  description:
    "프론트엔드 개발자 이정민의 포트폴리오입니다. 웹 개발 프로젝트와 기술 스택을 확인하실 수 있습니다.",
  keywords: [
    "포트폴리오",
    "프론트엔드",
    "웹 개발",
    "React",
    "Next.js",
    "이정민",
  ],
  authors: [{ name: "이정민" }],
  creator: "이정민",
  publisher: "이정민",
  robots: "index, follow",
  openGraph: {
    title: "이정민 포트폴리오",
    description:
      "프론트엔드 개발자 이정민의 포트폴리오입니다. 웹 개발 프로젝트와 기술 스택을 확인하실 수 있습니다.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/image/myFace.png",
        width: 1200,
        height: 630,
        alt: "이정민 포트폴리오 대표 이미지",
      },
    ],
    siteName: "이정민 포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "이정민 포트폴리오",
    description:
      "프론트엔드 개발자 이정민의 포트폴리오입니다. 웹 개발 프로젝트와 기술 스택을 확인하실 수 있습니다.",
    images: ["/image/myFace.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  alternates: {
    canonical: "https://portfolio-whljm1003.vercel.app/",
  },
  verification: {
    google: "Urb-UAfsYQ7F8GUktYxf0iccYuqK6dTOu_bnIUNdFc0",
  },
  category: "portfolio",
  classification: "personal website",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
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
    other: [{ rel: "manifest", url: "/favicon/site.webmanifest" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  themeColor: "#ffffff",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="e0fc47427133c069fe2d0d678d59f55cbd73b4e4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
