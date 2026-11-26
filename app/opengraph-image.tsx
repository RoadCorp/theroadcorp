import { ImageResponse } from "next/og";
import { MARK, markMarkup } from "@/components/roadcorp-mark";

export const alt = "RoadCorp: The Road to Infinity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SKY = "#121215";
const GROUND = "#0a0a0b";
const INK = "#f4f4f0";
const HAZE = "#98989e";
const MARKING = "#f5c518";

const EMBLEM_SIZE = 304;
const EMBLEM_TOP = 64;
const WORDMARK_SIZE = 82;
const WORDMARK_GAP = 32;
const MOTTO_SIZE = 26;
const MOTTO_GAP = 14;
const SKY_GLOW = `radial-gradient(circle at 50% ${EMBLEM_TOP + EMBLEM_SIZE / 2}px, rgba(255,255,255,0.12), rgba(245,197,24,0.09) 240px, rgba(10,10,11,0) 500px), linear-gradient(180deg, ${SKY} 0%, ${GROUND} 72%)`;

const EMBLEM_SVG = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${EMBLEM_SIZE}" height="${EMBLEM_SIZE}" viewBox="${MARK.viewBox}">`,
  '<defs><filter id="og-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5"/></filter></defs>',
  `<g filter="url(#og-glow)" opacity="0.32">${markMarkup("og-blur", INK, MARKING)}</g>`,
  `<g>${markMarkup("og-mark", INK, MARKING)}</g>`,
  "</svg>",
].join("");
const EMBLEM_SRC = `data:image/svg+xml;base64,${Buffer.from(EMBLEM_SVG).toString("base64")}`;

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
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: EMBLEM_TOP,
        backgroundColor: GROUND,
        backgroundImage: SKY_GLOW,
        fontFamily: fonts ? "Overpass" : undefined,
      }}
    >
      {/* Top highway-yellow trim bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 6,
          backgroundColor: MARKING,
        }}
      />
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements */}
      <img alt="" height={EMBLEM_SIZE} src={EMBLEM_SRC} width={EMBLEM_SIZE} />
      <div
        style={{
          marginTop: WORDMARK_GAP,
          color: INK,
          fontSize: WORDMARK_SIZE,
          fontWeight: BOLD,
          lineHeight: 1,
          letterSpacing: "0.04em",
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
          letterSpacing: "0.02em",
        }}
      >
        The Road to Infinity
      </div>
    </div>,
    { ...size, fonts }
  );
}
