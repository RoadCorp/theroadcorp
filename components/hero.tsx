import { ThemeMarkButton } from "@/components/theme-mark-button";

// The RoadCorp hero: the Carved Planet emblem centered in the asphalt sky
// above the wordmark and motto. Clicking the emblem toggles light/dark mode.
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-emblem">
        <ThemeMarkButton
          buttonClassName="scene-emblem-btn"
          id="hero-mark"
          markClassName="scene-mark"
        />
      </div>
      <div className="scene-lockup">
        <h1 className="scene-wordmark">RoadCorp</h1>
        <p className="scene-motto">The Road to Infinity</p>
      </div>
    </header>
  );
}
