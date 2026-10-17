import { MARK, MarkSky } from "@/components/roadcorp-mark";

// The RoadCorp logo at page scale: the ring and the Raidho rune rise over a
// planet whose horizon spans the page, with the wordmark and motto below it.
// The planet is the mark's own planet circle, scaled with the ring (see the
// .scene rules in globals.css).
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-sky">
        <svg
          aria-hidden="true"
          className="scene-mark"
          viewBox={MARK.skyViewBox}
          xmlns="http://www.w3.org/2000/svg"
        >
          <MarkSky id="hero-mark" />
        </svg>
      </div>
      <div aria-hidden="true" className="scene-planet" />
      <div className="scene-lockup">
        <h1 className="scene-wordmark">RoadCorp</h1>
        <p className="scene-motto">The Road to Infinity</p>
      </div>
    </header>
  );
}
