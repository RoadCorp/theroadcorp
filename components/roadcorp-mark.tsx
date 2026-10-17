// Vector redraw of the RoadCorp mark: a ring rising over a curved horizon,
// with the Raidho rune (ᚱ, the journey) inside the ring. The rune is the
// heart of the mark; never drop or replace it. Coordinates share one space so
// the hero and the social image can reuse the same paths.
export const RING_PATH =
  "M100 14.4a57.6 57.6 0 1 0 .01 0ZM100 25a47 47 0 1 1-.01 0Z";
export const RAIDHO_PATH =
  "M81.8 34.6H89.5L117.1 60.7L100.6 76.3L111.3 89.3L107.5 100L90.9 74.3V100H81.8ZM90.9 47.2L105.4 60.7L90.9 74.3Z";
// The ring's bounding box, for drawing the ring and rune without the horizon.
export const RING_VIEWBOX = "42.4 14.4 115.2 115.2";

const HORIZON_PATH = "M22 114Q100 63 178 113Q100 81 22 114Z";
const SKY_CLIP_PATH = "M0 0H200V113L178 113Q100 81 22 114L0 114Z";

export function RoadcorpMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="20 12 160 104"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="roadcorp-mark-sky">
          <path d={SKY_CLIP_PATH} />
        </clipPath>
      </defs>
      <g clipPath="url(#roadcorp-mark-sky)">
        <path d={RING_PATH} fillRule="evenodd" />
        <path d={RAIDHO_PATH} fillRule="evenodd" />
      </g>
      <path d={HORIZON_PATH} />
    </svg>
  );
}
