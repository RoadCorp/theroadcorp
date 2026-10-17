import {
  RAIDHO_PATH,
  RING_PATH,
  RING_VIEWBOX,
} from "@/components/roadcorp-mark";

// The RoadCorp logo at page scale: the ring and the Raidho rune rise over a
// horizon that spans the page, with the wordmark and motto below it.
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-sky">
        <svg
          aria-hidden="true"
          className="scene-ring"
          fill="currentColor"
          viewBox={RING_VIEWBOX}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={RING_PATH} fillRule="evenodd" />
          <path d={RAIDHO_PATH} fillRule="evenodd" />
        </svg>
      </div>

      <svg
        aria-hidden="true"
        className="scene-horizon"
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="scene-ground"
          d="M0 100Q500 -68 1000 100V104H0Z"
          fill="currentColor"
        />
        <path
          className="scene-horizon-line"
          d="M0 96Q500 -80 1000 96L1000 100Q500 -68 0 100Z"
          fill="currentColor"
        />
      </svg>

      <div className="scene-lockup">
        <h1 className="scene-wordmark">RoadCorp</h1>
        <p className="scene-motto">The Road to Infinity</p>
      </div>
    </header>
  );
}
