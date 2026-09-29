import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppId, AppMeta, WindowState } from "../types";
import { STATIC_APPS, findProject } from "../data";

function metaForApp(id: AppId): AppMeta {
  if (id.startsWith("proj:")) {
    const project = findProject(id.slice(5));
    return {
      title: project?.file ?? "unknown.proj",
      icon: project?.status === "live" ? "live" : "proj",
      width: 640,
      height: 580,
    };
  }
  return STATIC_APPS[id as keyof typeof STATIC_APPS];
}

interface WindowManagerValue {
  windows: WindowState[];
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  isTopWindow: (id: AppId) => boolean;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

const CASCADE_STEP = 28;
const CASCADE_MOD = 7;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);
  const cascadeCounter = useRef(0);

  const focusWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      const next = zCounter.current + 1;
      zCounter.current = next;
      return prev.map((w) => (w.id === id ? { ...w, zIndex: next, minimized: false } : w));
    });
  }, []);

  const openWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          const next = zCounter.current + 1;
          zCounter.current = next;
          return prev.map((w) => (w.id === id ? { ...w, zIndex: next, minimized: false } : w));
        }
        const meta = metaForApp(id);
        const step = (cascadeCounter.current++ % CASCADE_MOD) * CASCADE_STEP;
        const next = zCounter.current + 1;
        zCounter.current = next;
        const win: WindowState = {
          ...meta,
          id,
          zIndex: next,
          minimized: false,
          maximized: false,
          originX: 90 + step,
          originY: 24 + step,
        };
        return [...prev, win];
      });
    },
    []
  );

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const isTopWindow = useCallback(
    (id: AppId) => {
      const visible = windows.filter((w) => !w.minimized);
      if (!visible.length) return false;
      const top = visible.reduce((a, b) => (b.zIndex > a.zIndex ? b : a));
      return top.id === id;
    },
    [windows]
  );

  const value = useMemo<WindowManagerValue>(
    () => ({ windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, isTopWindow }),
    [windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize, isTopWindow]
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager(): WindowManagerValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within a WindowManagerProvider");
  return ctx;
}
