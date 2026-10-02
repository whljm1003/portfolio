import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "DEAN 이정민 프론트엔드 개발자 포트폴리오";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const barlowFont = await readFile(
    join(process.cwd(), "public/fonts/BarlowCondensed-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#E8E4D9",
          color: "#272B25",
          padding: "48px 56px 44px",
          fontFamily: "Barlow",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #272B25",
            paddingTop: 18,
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          <span>LEE JUNG MIN</span>
          <span>FRONTEND DEVELOPER</span>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 310, lineHeight: 1, letterSpacing: -7 }}>
            DEAN
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 178,
              height: 178,
              background: "#566348",
              transform: "rotate(-8deg)",
            }}
          >
            <svg width="116" height="116" viewBox="0 0 96 96" fill="none">
              <path
                d="M20 16H56L76 36V60L56 80H20V16ZM36 32V64H50L60 54V42L50 32H36Z"
                fill="#E8E4D9"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #272B25",
            paddingTop: 20,
            fontSize: 29,
            letterSpacing: 1,
          }}
        >
          <span>PRODUCT DEVELOPMENT &amp; PROBLEM SOLVING</span>
          <span style={{ color: "#A64D37" }}>PORTFOLIO</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Barlow",
          data: Uint8Array.from(barlowFont).buffer,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
