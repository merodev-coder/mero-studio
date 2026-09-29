import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { DESKTOP_ORDER, STATIC_APPS } from "../data";
import DesktopIcon from "./DesktopIcon";
import SceneBackground from "./SceneBackground";
import WindowFrame from "./WindowFrame";
import { useWindowManager } from "../state/WindowManagerContext";
import { renderApp } from "../apps/registry";

export default function Desktop() {
  const { windows, openWindow, isTopWindow } = useWindowManager();
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <main
      aria-label="Desktop"
      className="fixed inset-x-0 overflow-hidden bg-[linear-gradient(160deg,theme(colors.deep),theme(colors.ink)_70%)]"
      style={{
        top: "env(safe-area-inset-top, 0px)",
        bottom: "calc(46px + env(safe-area-inset-bottom, 0px))",
      }}
      ref={desktopRef}
    >
      {/* radial accent glows, matching the original wallpaper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 700px at 78% 8%, rgba(255,179,71,.14), transparent 60%), radial-gradient(900px 600px at 10% 100%, rgba(16,82,92,.75), transparent 65%)",
        }}
      />
      <SceneBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,.9), transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,.9), transparent 85%)",
        }}
      />

      <div
        role="list"
        className="absolute left-2.5 right-0 top-3.5 z-[1] grid grid-flow-col content-start gap-1"
        style={{ gridTemplateRows: "repeat(auto-fill, 104px)", gridAutoColumns: "100px", bottom: 10 }}
      >
        {DESKTOP_ORDER.map((id) => (
          <DesktopIcon key={id} label={STATIC_APPS[id].title} icon={STATIC_APPS[id].icon} onOpen={() => openWindow(id)} />
        ))}
      </div>

      <aside className="pointer-events-none absolute right-3 top-3 z-0 hidden max-w-[230px] rotate-[1.5deg] rounded-lg bg-accent px-3.5 py-3 text-[13px] leading-relaxed text-accentink shadow-[0_10px_24px_rgba(0,0,0,0.35)] sm:block">
        <strong className="block text-[15px]">Welcome.</strong>
        Double-click a file to open it.
      </aside>
      <aside className="pointer-events-none absolute bottom-3.5 right-3 z-0 max-w-[200px] rounded-lg bg-accent px-3.5 py-3 text-[13px] leading-relaxed text-accentink shadow-[0_10px_24px_rgba(0,0,0,0.35)] sm:hidden">
        <strong className="block text-[15px]">Welcome.</strong>
        Tap a file to open it.
      </aside>

      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {windows.map((w) => (
            // Keying on the fullscreen state too forces a clean remount when a
            // window is maximised/restored, which resets Framer Motion's internal
            // drag transform instead of fighting with the new layout.
            <WindowFrame
              key={`${w.id}-${w.maximized ? "full" : "normal"}`}
              win={w}
              isActive={!w.minimized && isTopWindow(w.id)}
              desktopRef={desktopRef}
            >
              {renderApp(w.id)}
            </WindowFrame>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
