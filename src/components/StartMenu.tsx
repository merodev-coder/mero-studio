import { AnimatePresence, motion } from "framer-motion";
import { DESKTOP_ORDER, PROFILE, PROJECTS, STATIC_APPS } from "../data";
import { Icon } from "../icons";
import { useWindowManager } from "../state/WindowManagerContext";
import type { AppId } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export default function StartMenu({ open, onClose, onRestart }: Props) {
  const { openWindow } = useWindowManager();

  const handleOpen = (id: AppId) => {
    openWindow(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          aria-label="Start menu"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="fixed left-2 z-[5001] w-[min(320px,calc(100vw-16px))] overflow-auto rounded-xl border border-[#263756] bg-[#101a2e] text-[#e6eefc] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          style={{
            bottom: "calc(46px + env(safe-area-inset-bottom, 0px) + 8px)",
            maxHeight: "calc(100vh - 120px)",
          }}
        >
          <div className="flex items-center gap-3 border-b border-[#22314f] p-4">
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-accent font-bold text-accentink">
              AA
            </div>
            <div>
              <div className="font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-[#8fa3c2]">
                {PROFILE.role} · {PROFILE.city.split(",")[0]}
              </div>
            </div>
          </div>

          <ul className="list-none space-y-0.5 p-2">
            {DESKTOP_ORDER.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleOpen(id)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left font-mono text-xs hover:bg-white/[0.08]"
                >
                  <span className="h-5 w-5 flex-none">
                    <Icon name={STATIC_APPS[id].icon} />
                  </span>
                  {STATIC_APPS[id].title}
                </button>
              </li>
            ))}
            {PROJECTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => handleOpen(`proj:${p.id}` as AppId)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left font-mono text-xs hover:bg-white/[0.08]"
                >
                  <span className="h-5 w-5 flex-none">
                    <Icon name={p.status === "live" ? "live" : "proj"} />
                  </span>
                  {p.file}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end border-t border-[#22314f] p-2">
            <button
              type="button"
              onClick={onRestart}
              className="rounded-md border border-[#2b3b5a] px-3 py-1.5 text-xs text-[#8fa3c2] hover:border-accent hover:text-accent"
            >
              Restart
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
