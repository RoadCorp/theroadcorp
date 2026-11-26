import { MARK, MarkSky } from "@/components/roadcorp-mark";

// The RoadCorp logo at page scale: the ring and the Raidho rune rise over a
// planet whose horizon spans the page, with the wordmark, motto and a dashed
// yellow highway centerline leading into the projects below.
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
        <div aria-hidden="true" className="scene-centerline">
          <span className="scene-dash" />
          <span className="scene-dash" />
          <span className="scene-dash" />
        </div>
      </div>
    </header>
  );
}
