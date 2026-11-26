// The RoadCorp mark ("Carved Planet"): a circular ring rising over a solid
// planet crescent, with the Raidho rune (ᚱ, the journey) centered in the sky
// and a perspective highway carved cleanly out of the planet below with a
// highway-yellow centerline.
//
// The Raidho rune is the heart of the mark: never drop or replace it, and keep
// it readable as Raidho (carved Nordic stave, angular bowl returning cleanly
// to mid-height, and descending leg aligned symmetrically over the road).
// app/icon.svg is a static adaptive copy of this geometry; keep it in sync.
export const MARK = {
  center: 100,
  ringRadius: 76,
  outerRadius: 81,
  stroke: 10,
  planet: { cx: 100, cy: 436, r: 313, skyMaskRadius: 320 },
  runePath:
    "M76 47L86 41L126.5 66.5L96.5 85.4L125.5 117H111.5L86 91V117H76ZM86 54.8V78.8L106.5 66.5Z",
  roadCutPath: "M89.5 122Q100 120.8 110.5 122L144 186H56Z",
  dashTop: "98,128 102,128 103.2,144 96.8,144",
  dashBottom: "96,154 104,154 106,181 94,181",
  // Snug 1:1 emblem viewBox centered at (100, 100) with outer radius 81.
  viewBox: "14 14 172 172",
} as const;

// SVG markup for the complete Carved Planet emblem. Returned as a string so
// server-side image generators (apple-icon, opengraph-image) share the exact
// same geometry as the live React mark.
export function markMarkup(
  id: string,
  color = "currentColor",
  accentColor = "var(--marking)"
) {
  const { center, ringRadius, outerRadius, stroke, planet } = MARK;
  return [
    "<defs>",
    `<mask id="${id}-sky"><rect fill="#fff" height="200" width="200" x="0" y="0"/>`,
    `<circle cx="${planet.cx}" cy="${planet.cy}" fill="#000" r="${planet.skyMaskRadius}"/></mask>`,
    `<clipPath id="${id}-circle"><circle cx="${center}" cy="${center}" r="${outerRadius}"/></clipPath>`,
    `<mask id="${id}-road"><rect fill="#fff" height="200" width="200" x="0" y="0"/>`,
    `<path d="${MARK.roadCutPath}" fill="#000"/></mask>`,
    "</defs>",
    `<g mask="url(#${id}-sky)">`,
    `<circle cx="${center}" cy="${center}" fill="none" r="${ringRadius}" stroke="${color}" stroke-width="${stroke}"/>`,
    `<path d="${MARK.runePath}" fill="${color}" fill-rule="evenodd"/>`,
    "</g>",
    `<g clip-path="url(#${id}-circle)">`,
    `<circle cx="${planet.cx}" cy="${planet.cy}" fill="${color}" mask="url(#${id}-road)" r="${planet.r}"/>`,
    "</g>",
    `<polygon fill="${accentColor}" points="${MARK.dashTop}"/>`,
    `<polygon fill="${accentColor}" points="${MARK.dashBottom}"/>`,
  ].join("");
}

export function RoadcorpMark({
  className,
  id = "roadcorp-mark",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={MARK.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static markup built from the constants above
        dangerouslySetInnerHTML={{ __html: markMarkup(id) }}
      />
    </svg>
  );
}
