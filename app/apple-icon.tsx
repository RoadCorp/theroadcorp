import { ImageResponse } from "next/og";
import {
  MARK,
  markHorizonMarkup,
  markSkyMarkup,
} from "@/components/roadcorp-mark";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

const MARK_SCALE = 0.74;
const MARK_CENTER_Y = 59;
const CANVAS_HALF = 2;

// Transparent RGBA 180x180 mark with ~16-30% padding so iOS 26 Liquid Glass
// derives the glyph silhouette from alpha instead of rendering a solid brick.
export default function AppleIcon() {
  const tx = (size.width / CANVAS_HALF - MARK.ring.cx * MARK_SCALE).toFixed(
    CANVAS_HALF
  );
  const ty = (size.height / CANVAS_HALF - MARK_CENTER_Y * MARK_SCALE).toFixed(
    CANVAS_HALF
  );
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">`,
    `<g transform="translate(${tx} ${ty}) scale(${MARK_SCALE})">`,
    markSkyMarkup("apple-icon", "#ffffff"),
    markHorizonMarkup("#ffffff"),
    "</g></svg>",
  ].join("");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements
    <img alt="" height={size.height} src={src} width={size.width} />,
    size
  );
}
