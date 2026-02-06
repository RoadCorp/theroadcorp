import Image from "next/image";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-12 sm:gap-16">
        {/* Logo */}
        <div className="scale-in logo-glow">
          <Image
            alt="Roadcorp logo"
            height={140}
            priority
            sizes="(max-width: 640px) 100px, 140px"
            src="/logos/roadcorp-logo-dark.png"
            width={140}
          />
        </div>

        {/* Motto */}
        <h1 className="fade-up font-serif text-3xl font-normal leading-snug tracking-wide text-foreground text-balance sm:text-4xl lg:text-5xl lg:leading-snug [animation-delay:0.2s]">
          The Road to Infinity
        </h1>

        {/* Scroll indicator */}
        <div className="fade-in flex flex-col items-center gap-3 [animation-delay:0.6s]">
          <div className="h-12 w-px bg-foreground/15" />
        </div>
      </div>
    </section>
  );
}
