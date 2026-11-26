"use client";

import { useEffect, useState } from "react";
import { RoadcorpMark } from "@/components/roadcorp-mark";

const STORAGE_KEY = "roadcorp-theme";
const THEME_EVENT = "roadcorp-theme-change";
const DARK_THEME_COLOR = "#0a0a0b";
const LIGHT_THEME_COLOR = "#f6f5f0";

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyDocumentTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "light") {
    root.dataset.theme = "light";
    root.classList.remove("dark");
  } else {
    root.dataset.theme = "dark";
    root.classList.add("dark");
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute(
      "content",
      next === "light" ? LIGHT_THEME_COLOR : DARK_THEME_COLOR
    );
  }
}

function applyTheme(next: Theme) {
  applyDocumentTheme(next);

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage errors in private/restricted browsers.
  }

  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: next }));
}

export function ThemeMarkButton({
  buttonClassName,
  id,
  markClassName,
}: {
  buttonClassName: string;
  id: string;
  markClassName: string;
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<Theme>).detail;
      setTheme(detail === "light" ? "light" : readTheme());
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      const next: Theme = event.newValue === "light" ? "light" : "dark";
      applyDocumentTheme(next);
      setTheme(next);
    };
    window.addEventListener(THEME_EVENT, onThemeChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(THEME_EVENT, onThemeChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const label = `Switch to ${nextTheme} mode`;

  return (
    <button
      aria-label={label}
      aria-pressed={theme === "light"}
      className={buttonClassName}
      onClick={() => applyTheme(nextTheme)}
      title={label}
      type="button"
    >
      <RoadcorpMark className={markClassName} id={id} />
    </button>
  );
}
