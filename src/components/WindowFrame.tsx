import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useDragControls } from "framer-motion";
import type { WindowState } from "../types";
import { CloseGlyph, MaxGlyph, MinGlyph } from "../icons";
import { useWindowManager } from "../state/WindowManagerContext";
import { useIsMobile } from "../hooks/useMediaQuery";

interface Props {
  win: WindowState;
  isActive: boolean;
  desktopRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

export default function WindowFrame({ win, isActive, desktopRef, children }: Props) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize } = useWindowManager();
  const dragControls = useDragControls();
  const isMobile = useIsMobile();
  const barRef = useRef<HTMLDivElement>(null);

  const fullscreen = win.maximized || isMobile;

  const baseStyle = fullscreen
    ? { left: 0, top: 0, width: "100%", height: "100%" }
    : { left: win.originX, top: win.originY, width: win.width, height: win.height };

  return (
    <motion.section
      role="dialog"
      aria-label={win.title}
      drag={!fullscreen}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={desktopRef}
      dragElastic={0}
      onPointerDownCapture={() => focusWindow(win.id)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.18, y: 420, pointerEvents: "none" }
          : { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
      }
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.14 } }}
      transition={{ duration: win.minimized ? 0.22 : 0.16, ease: "easeOut" }}
      aria-hidden={win.minimized}
      className={[
        "pointer-events-auto absolute flex flex-col overflow-hidden border border-edge bg-win",
        fullscreen ? "rounded-none" : "rounded-[10px]",
        isActive ? "shadow-win" : "shadow-wininactive",
      ].join(" ")}
      style={{
        ...baseStyle,
        zIndex: win.zIndex,
        minWidth: fullscreen ? undefined : 300,
        minHeight: fullscreen ? undefined : 200,
      }}
    >
      <header
        ref={barRef}
        onPointerDown={(e) => {
          if (!fullscreen) dragControls.start(e);
        }}
        onDoubleClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          if (!isMobile) toggleMaximize(win.id);
        }}
        className={[
          "flex h-[38px] flex-none select-none items-center gap-2.5 pl-3 pr-2",
          isActive ? "bg-title" : "bg-[#34405c]",
          fullscreen ? "cursor-default" : "cursor-grab active:cursor-grabbing",
          "text-titletext",
        ].join(" ")}
        style={{ touchAction: "none" }}
      >
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[12.5px]">
          {win.title}
        </span>
        <span className="flex gap-1">
          <button
            type="button"
            aria-label="Minimise"
            onClick={() => minimizeWindow(win.id)}
            className="grid h-[26px] w-7 place-items-center rounded-md hover:bg-white/[0.14]"
          >
            <MinGlyph />
          </button>
          {!isMobile && (
            <button
              type="button"
              aria-label="Maximise"
              onClick={() => toggleMaximize(win.id)}
              className="grid h-[26px] w-7 place-items-center rounded-md hover:bg-white/[0.14]"
            >
              <MaxGlyph />
            </button>
          )}
          <button
            type="button"
            aria-label="Close"
            onClick={() => closeWindow(win.id)}
            className="grid h-[26px] w-7 place-items-center rounded-md hover:bg-danger hover:text-white"
          >
            <CloseGlyph />
          </button>
        </span>
      </header>

      <div className={["flex-1 overflow-auto scroll-slim", win.flush ? "" : "px-6 py-5 sm:px-6"].join(" ")}>
        {children}
      </div>
    </motion.section>
  );
}
