import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            alt="Roadcorp logo"
            height={24}
            src="/logos/roadcorp-logo-dark.png"
            width={24}
          />
          <span className="text-sm font-medium text-foreground">
            Roadcorp
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {"The Road to Infinity"}
        </p>
      </div>
    </footer>
  );
}
