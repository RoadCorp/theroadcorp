import { ImageResponse } from "next/og";
import { MARK, markMarkup } from "@/components/roadcorp-mark";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

const MARK_SCALE = 0.72;
const CANVAS_HALF = 2;

// Transparent RGBA 180x180 emblem (~17% padding on every side) so iOS 26
// Liquid Glass derives the silhouette cleanly from alpha instead of rendering
// a solid frosted brick.
export default function AppleIcon() {
  const offset = (size.width / CANVAS_HALF - MARK.center * MARK_SCALE).toFixed(
    CANVAS_HALF
  );
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">`,
    `<g transform="translate(${offset} ${offset}) scale(${MARK_SCALE})">`,
    markMarkup("apple-icon", "#ffffff", "#f5c518"),
    "</g></svg>",
  ].join("");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements
    <img alt="" height={size.height} src={src} width={size.width} />,
    size
  );
}
