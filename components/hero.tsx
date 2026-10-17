// The RoadCorp logo at page scale: the ring rises over the horizon with the
// motto where the logo has its R, and the wordmark sits below the horizon.
export function Hero() {
  return (
    <header className="scene">
      <div className="scene-sky">
        <svg
          aria-hidden="true"
          className="scene-ring"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            r="45.4"
            stroke="currentColor"
            strokeWidth="9.2"
          />
        </svg>
        <p className="scene-motto">
          The Road
          <br />
          to Infinity
        </p>
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

      <h1 className="scene-wordmark">RoadCorp</h1>
    </header>
  );
}
