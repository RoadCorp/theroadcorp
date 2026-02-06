import Image from "next/image";

export function Footer() {
  return (
    <footer className="shrink-0 border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Image
            alt="Roadcorp logo"
            height={16}
            src="/logos/roadcorp-logo-dark.png"
            width={16}
          />
          <span className="text-xs font-medium text-foreground">
            Roadcorp
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground sm:text-xs">
          {"The Road to Infinity"}
        </p>
      </div>
    </footer>
  );
}
