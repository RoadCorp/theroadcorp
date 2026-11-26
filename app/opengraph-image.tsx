import { ImageResponse } from "next/og";
import { MARK, markSkyMarkup } from "@/components/roadcorp-mark";

export const alt = "RoadCorp: The Road to Infinity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SKY = "#141416";
const GROUND = "#0a0a0b";
const INK = "#f4f4f0";
const HAZE = "#98989e";
const MARKING = "#f5c518";

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
const WORDMARK_GAP = 42;
const MOTTO_SIZE = 26; // larger than the page's ratio so it reads in previews
const MOTTO_GAP = 16;
const STRIPE_GAP = 26;
const SKY_GLOW = `radial-gradient(circle at 50% ${toY(MARK.ring.cy)}px, rgba(255,255,255,0.13), rgba(245,197,24,0.09) 270px, rgba(245,197,24,0) 520px)`;
const MARK_TRANSFORM = `translate(${CENTER_X} ${MARK_TOP}) scale(${K}) translate(${-MARK.ring.cx} ${-RING_TOP_UNITS})`;

// The mark (with a blurred copy for its glow) and the planet as one SVG,
// since the image renderer only draws finished SVG markup.
const SCENE_SVG = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">`,
  '<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter><filter id="horizon-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter></defs>',
  `<g filter="url(#glow)" opacity="0.45" transform="${MARK_TRANSFORM}">${markSkyMarkup("og-glow", INK)}</g>`,
  `<g transform="${MARK_TRANSFORM}">${markSkyMarkup("og-mark", INK)}</g>`,
  `<circle cx="${CENTER_X}" cy="${PLANET_Y}" r="${PLANET_R}" fill="none" filter="url(#horizon-glow)" opacity="0.45" stroke="${MARKING}" stroke-width="${MARK.horizonStroke * K}"/>`,
  `<circle cx="${CENTER_X}" cy="${PLANET_Y}" r="${PLANET_R}" fill="${GROUND}" stroke="${INK}" stroke-width="${MARK.horizonStroke * K}"/>`,
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
            letterSpacing: "0.03em",
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
        <div
          style={{
            marginTop: STRIPE_GAP,
            display: "flex",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 32,
              height: 4,
              borderRadius: 1,
              backgroundColor: MARKING,
              opacity: 0.45,
            }}
          />
          <div
            style={{
              width: 32,
              height: 4,
              borderRadius: 1,
              backgroundColor: MARKING,
            }}
          />
          <div
            style={{
              width: 32,
              height: 4,
              borderRadius: 1,
              backgroundColor: MARKING,
              opacity: 0.45,
            }}
          />
        </div>
      </div>
    </div>,
    { ...size, fonts }
  );
}
