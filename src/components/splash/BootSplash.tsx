"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSplash from "@/components/splash/LoadingSplash";

export default function BootSplash({ minDuration = 900 }: { minDuration?: number }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), minDuration);
    return () => clearTimeout(t);
  }, [minDuration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[9999]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <LoadingSplash />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
