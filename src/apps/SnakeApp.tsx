import { useCallback, useEffect, useRef, useState } from "react";

const N = 18;
const CELL = 20;
type P = { x: number; y: number };
const DIRS: Record<string, P> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const KEYS: Record<string, string> = {
  ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right",
};

function readBest() {
  try { return Number(localStorage.getItem("mero-snake-best")) || 0; } catch { return 0; }
}

export default function SnakeApp() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const g = useRef({ snake: [{ x: 8, y: 9 }] as P[], dir: DIRS.right, next: DIRS.right, food: { x: 12, y: 9 }, over: true, score: 0 });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  const [over, setOver] = useState(true);

  const draw = useCallback(() => {
    const c = canvas.current?.getContext("2d");
    if (!c) return;
    c.fillStyle = "#0a0f1a";
    c.fillRect(0, 0, N * CELL, N * CELL);
    c.fillStyle = "#ffb347";
    c.fillRect(g.current.food.x * CELL + 3, g.current.food.y * CELL + 3, CELL - 6, CELL - 6);
    g.current.snake.forEach((p, i) => {
      c.fillStyle = i === 0 ? "#7dffc4" : "#38d996";
      c.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const start = useCallback(() => {
    g.current = { snake: [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }], dir: DIRS.right, next: DIRS.right, food: { x: 12, y: 9 }, over: false, score: 0 };
    setScore(0);
    setOver(false);
    root.current?.focus();
  }, []);

  const turn = useCallback((d: string) => {
    const n = DIRS[d];
    const cur = g.current.dir;
    if (n.x + cur.x !== 0 || n.y + cur.y !== 0) g.current.next = n;
  }, []);

  useEffect(() => {
    draw();
    const id = window.setInterval(() => {
      const s = g.current;
      if (s.over) return;
      s.dir = s.next;
      const h = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || s.snake.some((p) => p.x === h.x && p.y === h.y)) {
        s.over = true;
        setOver(true);
        setBest((b) => {
          const nb = Math.max(b, s.score);
          try { localStorage.setItem("mero-snake-best", String(nb)); } catch { /* storage unavailable */ }
          return nb;
        });
        return;
      }
      s.snake.unshift(h);
      if (h.x === s.food.x && h.y === s.food.y) {
        s.score += 1;
        setScore(s.score);
        do { s.food = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) }; }
        while (s.snake.some((p) => p.x === s.food.x && p.y === s.food.y));
      } else s.snake.pop();
      draw();
    }, 110);
    return () => window.clearInterval(id);
  }, [draw]);

  const onKey = (e: React.KeyboardEvent) => {
    const d = KEYS[e.key];
    if (d) { e.preventDefault(); turn(d); }
    else if ((e.key === " " || e.key === "Enter") && g.current.over) { e.preventDefault(); start(); }
  };

  return (
    <div ref={root} tabIndex={0} onKeyDown={onKey} className="flex h-full flex-col items-center gap-3 bg-[#0e1626] p-4 font-mono text-[13px] text-[#cfe0ff] outline-none">
      <div className="flex w-full max-w-[360px] justify-between">
        <span>score <b className="text-ok">{score}</b></span>
        <span className="text-[#6f86ad]">best {best}</span>
      </div>
      <div className="relative">
        <canvas ref={canvas} width={N * CELL} height={N * CELL} className="rounded border border-[#2a3b5c]" />
        {over && (
          <button type="button" onClick={start} className="absolute inset-0 grid place-items-center bg-[#0a0f1a]/80 text-accent">
            {score > 0 ? `game over · ${score} · play again` : "press space or tap to play"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:hidden">
        {[["", ""], ["up", "▲"], ["", ""], ["left", "◀"], ["down", "▼"], ["right", "▶"]].map(([d, l], i) =>
          d ? (
            <button key={i} type="button" onClick={() => turn(d)} className="h-11 w-14 rounded border border-[#2a3b5c] bg-[#16233d]">{l}</button>
          ) : <span key={i} />
        )}
      </div>
      <p className="hidden text-xs text-[#6f86ad] sm:block">arrow keys or WASD</p>
    </div>
  );
}
