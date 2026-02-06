import Image from "next/image";

export function Hero() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-8 sm:gap-10">
        {/* Logo */}
        <div className="scale-in logo-glow">
          <Image
            alt="Roadcorp logo"
            className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
            height={128}
            priority
            src="/logos/roadcorp-logo-dark.png"
            width={128}
          />
        </div>

        {/* Motto */}
        <h1 className="fade-up font-serif text-2xl font-normal leading-snug tracking-wide text-foreground text-balance sm:text-3xl lg:text-4xl [animation-delay:0.2s]">
          The Road to Infinity
        </h1>
      </div>
    </section>
  );
}
