import { useCallback, useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import TaskBar from "./components/TaskBar";
import Effects from "./components/Effects";
import StartMenu from "./components/StartMenu";
import { WindowManagerProvider, useWindowManager } from "./state/WindowManagerContext";

function Shell() {
  const [booted, setBooted] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [bootKey, setBootKey] = useState(0);
  const { windows, openWindow, closeWindow } = useWindowManager();

  const handleBootDone = useCallback(() => {
    setBooted(true);
  }, []);

  // Open the About window once booting finishes, if nothing is open yet.
  useEffect(() => {
    if (booted && windows.length === 0) {
      openWindow("about");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  useEffect(() => {
    if (!startOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[aria-label='Start menu']") && !target.closest("[aria-haspopup='true']")) {
        setStartOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [startOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (startOpen) {
          setStartOpen(false);
          return;
        }
        const target = document.activeElement;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
        const visible = windows.filter((w) => !w.minimized);
        if (!visible.length) return;
        const top = visible.reduce((a, b) => (b.zIndex > a.zIndex ? b : a));
        closeWindow(top.id);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [startOpen, windows, closeWindow]);

  const restart = () => {
    setStartOpen(false);
    windows.forEach((w) => closeWindow(w.id));
    setBooted(false);
    setBootKey((k) => k + 1);
  };

  return (
    <>
      {!booted && <BootScreen key={bootKey} onDone={handleBootDone} />}
      <Desktop />
      <Effects />
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onRestart={restart} />
      <TaskBar startOpen={startOpen} onToggleStart={() => setStartOpen((v) => !v)} />
    </>
  );
}

export default function App() {
  return (
    <WindowManagerProvider>
      <Shell />
    </WindowManagerProvider>
  );
}
