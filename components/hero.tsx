import Image from "next/image";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 sm:gap-14">
        {/* Logo */}
        <div className="scale-in">
          <Image
            alt="Roadcorp logo"
            className="drop-shadow-sm"
            height={160}
            priority
            sizes="(max-width: 640px) 120px, 160px"
            src="/logos/roadcorp-logo-light.png"
            width={160}
          />
        </div>

        {/* Motto */}
        <div className="stagger-children flex flex-col items-center gap-6">
          <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-balance sm:text-7xl sm:leading-[1.05] lg:text-8xl lg:leading-[1.02]">
            The Road to Infinity
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground sm:max-w-lg sm:text-xl">
            Building innovative products and solutions. Designing, shipping,
            iterating.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in mt-4 flex flex-col items-center gap-2 [animation-delay:0.8s]">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Our Work
          </span>
          <div className="h-10 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
