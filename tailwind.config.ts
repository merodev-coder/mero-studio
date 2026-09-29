import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1424",
        deep: "#0f2740",
        teal: "#10525c",
        win: "#eef1f5",
        win2: "#e2e7ee",
        edge: "#c3cbd8",
        title: "#1b2846",
        titletext: "#e9eef8",
        ink2: "#16202f",
        muted: "#566276",
        accent: "#ffb347",
        accentink: "#2a1800",
        link: "#0b5bd3",
        ok: "#38d996",
        danger: "#ff6b5e",
      },
      fontFamily: {
        ui: ["IBM Plex Sans", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        win: "0 24px 60px rgba(0,0,0,.5), 0 2px 0 rgba(255,255,255,.4) inset",
        wininactive: "0 12px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
