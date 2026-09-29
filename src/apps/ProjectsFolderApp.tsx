import { PROJECTS } from "../data";
import DesktopIcon from "../components/DesktopIcon";
import { useWindowManager } from "../state/WindowManagerContext";
import type { AppId } from "../types";

export default function ProjectsFolderApp() {
  const { openWindow } = useWindowManager();

  return (
    <div>
      <div className="border-b border-edge bg-win2 px-3.5 py-2 font-mono text-xs text-muted">
        C:/Users/Ammar/Projects · {PROJECTS.length} items
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] content-start gap-1.5 p-3.5">
        {PROJECTS.map((p) => (
          <DesktopIcon
            key={p.id}
            label={p.file}
            icon={p.status === "live" ? "live" : "proj"}
            dark
            onOpen={() => openWindow(`proj:${p.id}` as AppId)}
          />
        ))}
      </div>
    </div>
  );
}
