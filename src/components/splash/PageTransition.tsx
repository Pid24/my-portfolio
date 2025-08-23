"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSplash from "@/components/splash/LoadingSplash"; // pakai loader kamu

export default function PageTransition({ minDuration = 700 }: { minDuration?: number }) {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      setShow(true);
      const t = setTimeout(() => setShow(false), minDuration);
      return () => clearTimeout(t);
    }
  }, [pathname, minDuration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[55]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          <LoadingSplash />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
