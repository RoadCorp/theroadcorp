import { RoadcorpMark } from "@/components/roadcorp-mark";

// The RoadCorp hero: the Carved Planet emblem centered in the asphalt sky,
// leading straight through the wordmark and motto down a dashed yellow
// highway centerline into the projects directory below.
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-emblem">
        <RoadcorpMark className="scene-mark" id="hero-mark" />
      </div>
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
