import { ImageResponse } from "next/og";
import { RAIDHO_PATH, RING_VIEWBOX } from "@/components/roadcorp-mark";

export const alt = "RoadCorp: The Road to Infinity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SKY = "#0e1630";
const GROUND = "#080d1c";
const INK = "#eef0f6";
const HAZE = "#8e98b5";

// The homepage hero at a fixed size, using the same ratios as the .scene
// rules in globals.css: every measure is a share of the ring diameter.
const RING = 420;
const RING_TOP = 60;
const RING_LEFT = (size.width - RING) / 2;
const RING_STROKE = 39; // 0.092 of the ring
const HORIZON_HEIGHT = 101; // 0.24 of the ring
const HORIZON_TOP = 325; // ring top + 0.65 ring - 0.08 horizon
const WORDMARK_SIZE = 84; // 0.2 of the ring
const WORDMARK_GAP = 8; // 0.02 of the ring
const MOTTO_SIZE = 26; // larger than the page's 0.05 so it reads in previews
const MOTTO_GAP = 18;
const SKY_GLOW = `radial-gradient(circle at 50% ${RING_TOP + RING / 2}px, rgba(214,224,255,0.16), rgba(214,224,255,0.04) 294px, rgba(214,224,255,0) 504px)`;

const SEMIBOLD = 600 as const;
const BOLD = 700 as const;

const FONT_URL_PATTERN = /src: url\((.+?)\) format\('(opentype|truetype)'\)/;

// Google Fonts serves TrueType when the request has no browser user agent.
async function loadOverpass(
  text: string,
  weight: typeof SEMIBOLD | typeof BOLD
) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Overpass:wght@${weight}&text=${encodeURIComponent(text)}`
    ).then((res) => res.text());
    const url = css.match(FONT_URL_PATTERN)?.[1];
    if (!url) {
      return null;
    }
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [semibold, bold] = await Promise.all([
    loadOverpass("The Road to Infinity", SEMIBOLD),
    loadOverpass("ROADCORP", BOLD),
  ]);
  const fonts =
    semibold && bold
      ? [
          {
            name: "Overpass",
            data: semibold,
            style: "normal" as const,
            weight: SEMIBOLD,
          },
          {
            name: "Overpass",
            data: bold,
            style: "normal" as const,
            weight: BOLD,
          },
        ]
      : undefined;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: SKY,
        backgroundImage: SKY_GLOW,
        fontFamily: fonts ? "Overpass" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: RING_LEFT,
          top: RING_TOP,
          width: RING,
          height: RING,
          borderRadius: "50%",
          border: `${RING_STROKE}px solid #ffffff`,
          boxShadow:
            "0 0 12px rgba(255,255,255,0.45), 0 0 48px rgba(196,210,255,0.25)",
        }}
      />
      <svg
        aria-hidden="true"
        fill="#ffffff"
        height={RING}
        style={{ position: "absolute", left: RING_LEFT, top: RING_TOP }}
        viewBox={RING_VIEWBOX}
        width={RING}
      >
        <path d={RAIDHO_PATH} fillRule="evenodd" />
      </svg>
      <svg
        aria-hidden="true"
        height={HORIZON_HEIGHT}
        preserveAspectRatio="none"
        style={{ position: "absolute", left: 0, top: HORIZON_TOP }}
        viewBox="0 0 1000 100"
        width={size.width}
      >
        <path d="M0 100Q500 -68 1000 100Z" fill={GROUND} />
        <path
          d="M0 96Q500 -80 1000 96L1000 100Q500 -68 0 100Z"
          fill="#ffffff"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: HORIZON_TOP + HORIZON_HEIGHT - 1,
          width: "100%",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: WORDMARK_GAP,
          backgroundColor: GROUND,
        }}
      >
        <div
          style={{
            color: INK,
            fontSize: WORDMARK_SIZE,
            fontWeight: BOLD,
            lineHeight: 1,
            letterSpacing: "0.01em",
          }}
        >
          ROADCORP
        </div>
        <div
          style={{
            marginTop: MOTTO_GAP,
            color: HAZE,
            fontSize: MOTTO_SIZE,
            fontWeight: SEMIBOLD,
            letterSpacing: "0.01em",
          }}
        >
          The Road to Infinity
        </div>
      </div>
    </div>,
    { ...size, fonts }
  );
}
