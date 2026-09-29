import { useEffect, useState } from "react";
import { PROFILE } from "../data";
import { useWindowManager } from "../state/WindowManagerContext";
import { useIsMobile } from "../hooks/useMediaQuery";

interface Props {
  startOpen: boolean;
  onToggleStart: () => void;
}

export default function TaskBar({ startOpen, onToggleStart }: Props) {
  const { windows, focusWindow, minimizeWindow, isTopWindow } = useWindowManager();
  const [time, setTime] = useState(() => formatTime());
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-[5000] flex items-center gap-2 border-t border-[#22314f] bg-[#09101e]/85 px-2 text-[#dce6f8] backdrop-blur-md"
      style={{ height: "calc(46px + env(safe-area-inset-bottom, 0px))", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={startOpen}
        onClick={onToggleStart}
        className="inline-flex h-[34px] items-center gap-2 rounded-md bg-accent px-3.5 text-[13.5px] font-semibold text-accentink hover:bg-[#ffc16b]"
      >
        <span className="h-2.5 w-2.5 rounded-[3px] bg-accentink" aria-hidden="true" />
        Start
      </button>

      <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto scroll-slim">
        {windows.map((w) => {
          const active = !w.minimized && isTopWindow(w.id);
          return (
            <button
              key={w.id}
              type="button"
              role="listitem"
              onClick={() => (w.minimized || active ? focusWindow(w.id) : minimizeWindow(w.id))}
              className={[
                "h-[34px] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border-b-2 px-2.5 font-mono text-xs",
                active
                  ? "border-accent bg-white/[0.16] text-[#dce6f8]"
                  : "border-transparent bg-white/[0.06] text-[#dce6f8] hover:bg-white/[0.12]",
              ].join(" ")}
              style={{ flexBasis: isMobile ? 110 : 170 }}
            >
              {w.title}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pr-1 text-[12.5px]">
        {!isMobile && (
          <a href={PROFILE.github} target="_blank" rel="noopener" className="text-[#dce6f8] hover:text-accent">
            GitHub
          </a>
        )}
        <time className="font-mono">{time}</time>
      </div>
    </footer>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
