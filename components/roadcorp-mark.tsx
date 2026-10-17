// The RoadCorp mark: a ring rising over a planet's horizon, with the Raidho
// rune (ᚱ, the journey) inside the ring. The rune is the heart of the mark;
// never drop or replace it, and keep it readable as Raidho: a straight stave,
// an angular bowl that returns to the stave near mid-height, and a long leg
// running down to the horizon.
//
// Geometry, in mark units: ring and rune share one stroke weight, the rune
// has a flat top like a carved stave, and the planet is a circle whose top
// edge is the horizon. Everything above the planet is masked with a small gap,
// so the ring and rune rise clear of the horizon. The hero and the social
// image draw the planet themselves at page scale from these same numbers.
// app/icon.svg is a static copy of this geometry; update it with any change.
export const MARK = {
  stroke: 9,
  ring: { cx: 100, cy: 64, r: 46 },
  runeTop: 30,
  stem: "M86 112V30",
  bowl: "M86 30L114 48L86 66",
  leg: "M86 66L124 104",
  planet: { cx: 100, cy: 420, r: 325 },
  horizonStroke: 3,
  gap: 5,
  // Ring and rune only (the hero draws its own horizon).
  skyViewBox: "20 10 160 100",
  // The whole mark with its horizon.
  viewBox: "18 10 164 98",
} as const;

const HORIZON_HALF_WIDTH = 78;
const maskRadius = MARK.planet.r + MARK.horizonStroke / 2 + MARK.gap;
const horizonY = (
  MARK.planet.cy - Math.sqrt(MARK.planet.r ** 2 - HORIZON_HALF_WIDTH ** 2)
).toFixed(2);
const horizonPath = `M${MARK.planet.cx - HORIZON_HALF_WIDTH} ${horizonY}A${MARK.planet.r} ${MARK.planet.r} 0 0 1 ${MARK.planet.cx + HORIZON_HALF_WIDTH} ${horizonY}`;

// SVG markup for the ring and rune above the horizon. It is a string so the
// social image renderer, which only takes finished SVG, can use it too.
export function markSkyMarkup(id: string, color = "currentColor") {
  const { ring, planet } = MARK;
  return [
    "<defs>",
    `<mask id="${id}-sky"><rect fill="#fff" height="200" width="200" x="0" y="0"/>`,
    `<circle cx="${planet.cx}" cy="${planet.cy}" fill="#000" r="${maskRadius}"/></mask>`,
    `<clipPath id="${id}-rune"><rect height="200" width="200" x="0" y="${MARK.runeTop}"/></clipPath>`,
    "</defs>",
    `<g fill="none" mask="url(#${id}-sky)" stroke="${color}" stroke-miterlimit="10" stroke-width="${MARK.stroke}">`,
    `<circle cx="${ring.cx}" cy="${ring.cy}" r="${ring.r}"/>`,
    `<g clip-path="url(#${id}-rune)">`,
    `<path d="${MARK.stem}"/><path d="${MARK.bowl}"/><path d="${MARK.leg}"/>`,
    "</g></g>",
  ].join("");
}

export function markHorizonMarkup(color = "currentColor") {
  return `<path d="${horizonPath}" fill="none" stroke="${color}" stroke-linecap="round" stroke-width="${MARK.horizonStroke}"/>`;
}

export function MarkSky({ id }: { id: string }) {
  return (
    <g
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static markup built from the constants above
      dangerouslySetInnerHTML={{ __html: markSkyMarkup(id) }}
    />
  );
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
        dangerouslySetInnerHTML={{
          __html: markSkyMarkup(id) + markHorizonMarkup(),
        }}
      />
    </svg>
  );
}
