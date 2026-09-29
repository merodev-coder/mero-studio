import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const STEPS = [
  "mounting /projects",
  "loading experience.log",
  "starting tech-stack.sys",
  "welcome, guest",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      finish();
      return;
    }
    if (shown >= STEPS.length) {
      const t = setTimeout(finish, 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((n) => n + 1), 380);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, reducedMotion]);

  function finish() {
    setVisible(false);
    setTimeout(onDone, reducedMotion ? 0 : 400);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="status"
          aria-live="polite"
        >
          <div className="w-[min(420px,86vw)]">
            <motion.div
              className="font-mono text-[clamp(34px,8vw,52px)] font-bold tracking-tight text-titletext"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              mero<span className="text-accent">OS</span>
            </motion.div>

            <div className="mt-6 min-h-[96px] font-mono text-[13px] leading-7 text-[#8fa3c2]">
              {STEPS.slice(0, shown).map((line) => (
                <motion.div key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                  <span className="text-ok">[ ok ]</span> {line}
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={finish}
              className="mt-4 rounded-md border border-[#2b3b5a] px-3.5 py-1.5 text-[13px] text-[#8fa3c2] transition-colors hover:border-accent hover:text-accent"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
