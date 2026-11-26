import { RoadcorpMark } from "@/components/roadcorp-mark";

// The RoadCorp hero: the Carved Planet emblem centered in the asphalt sky
// above the wordmark and motto.
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-emblem">
        <RoadcorpMark className="scene-mark" id="hero-mark" />
      </div>
      <div className="scene-lockup">
        <h1 className="scene-wordmark">RoadCorp</h1>
        <p className="scene-motto">The Road to Infinity</p>
      </div>
    </header>
  );
}
