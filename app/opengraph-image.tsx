import { ImageResponse } from "next/og";
import { MARK, markSkyMarkup } from "@/components/roadcorp-mark";

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

// The homepage hero at a fixed size: K pixels per mark unit, with the
// ring's top edge at MARK_TOP. The planet is the mark's own planet circle.
const K = 4;
const MARK_TOP = 34;
const RING_TOP_UNITS = MARK.ring.cy - MARK.ring.r - MARK.stroke / 2;
const toY = (units: number) => MARK_TOP + (units - RING_TOP_UNITS) * K;
const CENTER_X = size.width / 2;
const PLANET_Y = toY(MARK.planet.cy);
const PLANET_R = MARK.planet.r * K;
const HORIZON_BOTTOM = toY(
  MARK.planet.cy - MARK.planet.r + MARK.horizonStroke / 2
);
const WORDMARK_SIZE = 84;
const WORDMARK_GAP = 48;
const MOTTO_SIZE = 26; // larger than the page's ratio so it reads in previews
const MOTTO_GAP = 18;
const SKY_GLOW = `radial-gradient(circle at 50% ${toY(MARK.ring.cy)}px, rgba(214,224,255,0.16), rgba(214,224,255,0.04) 280px, rgba(214,224,255,0) 480px)`;
const MARK_TRANSFORM = `translate(${CENTER_X} ${MARK_TOP}) scale(${K}) translate(${-MARK.ring.cx} ${-RING_TOP_UNITS})`;

// The mark (with a blurred copy for its glow) and the planet as one SVG,
// since the image renderer only draws finished SVG markup.
const SCENE_SVG = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">`,
  '<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>',
  `<g filter="url(#glow)" opacity="0.55" transform="${MARK_TRANSFORM}">${markSkyMarkup("og-glow", "#ffffff")}</g>`,
  `<g transform="${MARK_TRANSFORM}">${markSkyMarkup("og-mark", "#ffffff")}</g>`,
  `<circle cx="${CENTER_X}" cy="${PLANET_Y}" r="${PLANET_R}" fill="${GROUND}" stroke="#ffffff" stroke-width="${MARK.horizonStroke * K}"/>`,
  "</svg>",
].join("");
const SCENE_SRC = `data:image/svg+xml;base64,${Buffer.from(SCENE_SVG).toString("base64")}`;

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
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements */}
      <img
        alt=""
        height={size.height}
        src={SCENE_SRC}
        style={{ position: "absolute", left: 0, top: 0 }}
        width={size.width}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: HORIZON_BOTTOM,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: WORDMARK_GAP,
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
