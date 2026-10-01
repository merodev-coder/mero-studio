import { useEffect, useRef, useState } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
type Mode = "confetti" | "matrix" | null;

/** Full-screen canvas effects, triggered by the Konami code or the terminal (window events). */
export default function Effects() {
  const [mode, setMode] = useState<Mode>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      i = e.key === KONAMI[i] ? i + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) { i = 0; setMode("confetti"); }
    };
    const on = (m: Mode) => () => setMode(m);
    const c = on("confetti"), x = on("matrix");
    window.addEventListener("keydown", onKey);
    window.addEventListener("mero:confetti", c);
    window.addEventListener("mero:matrix", x);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mero:confetti", c);
      window.removeEventListener("mero:matrix", x);
    };
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (!mode || !cv) return;
    const ctx = cv.getContext("2d")!;
    const W = (cv.width = window.innerWidth), H = (cv.height = window.innerHeight);
    const end = performance.now() + (mode === "matrix" ? 6000 : 4500);
    let raf = 0;
    const cols = Math.ceil(W / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    const bits = Array.from({ length: 160 }, () => ({
      x: W / 2, y: H * 0.6, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 18 - 4,
      c: ["#ffb347", "#38d996", "#7aa2ff", "#ff6b5e"][Math.floor(Math.random() * 4)], s: 4 + Math.random() * 6,
    }));
    const tick = (t: number) => {
      if (t > end) { setMode(null); return; }
      if (mode === "matrix") {
        ctx.fillStyle = "rgba(5,10,8,0.12)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#38d996"; ctx.font = "15px monospace";
        drops.forEach((y, k) => {
          ctx.fillText(String.fromCharCode(0x30a0 + Math.random() * 90), k * 16, y * 16);
          drops[k] = y * 16 > H && Math.random() > 0.97 ? 0 : y + 1;
        });
      } else {
        ctx.clearRect(0, 0, W, H);
        bits.forEach((b) => {
          b.x += b.vx; b.y += b.vy; b.vy += 0.5; b.vx *= 0.99;
          ctx.fillStyle = b.c; ctx.fillRect(b.x, b.y, b.s, b.s);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  if (!mode) return null;
  return (
    <canvas
      ref={ref}
      onClick={() => setMode(null)}
      aria-hidden="true"
      className={`fixed inset-0 z-[9000] ${mode === "matrix" ? "bg-[#050a08]" : "pointer-events-none"}`}
    />
  );
}
