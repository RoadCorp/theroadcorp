// Vector redraw of the RoadCorp mark: a ring and an angular R rising over a
// curved horizon. Fills use currentColor so the mark follows the text color.
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
          <path d="M0 0H200V113L178 113Q100 81 22 114L0 114Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#roadcorp-mark-sky)">
        <path
          d="M100 14.4a57.6 57.6 0 1 0 .01 0ZM100 25a47 47 0 1 1-.01 0Z"
          fillRule="evenodd"
        />
        <path
          d="M81.8 34.6H89.5L117.1 60.7L100.6 76.3L111.3 89.3L107.5 100L90.9 74.3V100H81.8ZM90.9 47.2L105.4 60.7L90.9 74.3Z"
          fillRule="evenodd"
        />
      </g>
      <path d="M22 114Q100 63 178 113Q100 81 22 114Z" />
    </svg>
  );
}
