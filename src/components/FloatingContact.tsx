"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingContact() {
  // Tombol selalu tampil di mobile (disembunyikan di >= md)
  return (
    <div
      className="
        fixed
        right-4
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        md:hidden
        z-[100]
      "
    >
      <Link
        href="/contact"
        className="
          inline-flex items-center gap-2
          rounded-full border
          bg-primary text-primary-foreground
          px-4 py-3 text-sm font-medium
          shadow-lg shadow-black/10
          hover:translate-y-[-1px] hover:shadow-xl
          active:translate-y-0 transition
        "
        aria-label="Hubungi saya"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Contact</span>
      </Link>
    </div>
  );
}
