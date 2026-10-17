import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Renders the favicon SVG at the touch-icon size, so app/icon.svg stays the
// single source for both.
export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"), "utf8");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements
    <img alt="" height={size.height} src={src} width={size.width} />,
    size
  );
}
