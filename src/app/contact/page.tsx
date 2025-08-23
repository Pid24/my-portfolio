import type { Metadata } from "next";
import WhatsAppContact from "@/components/contact/WhatsAppContact";

export const metadata: Metadata = {
  title: "Contact — Rofid Nasif Annafie",
  description: "Hubungi Rofid via WhatsApp untuk diskusi proyek Laravel, e-commerce, landing page, dan payment gateway.",
};

export default function Page() {
  return <WhatsAppContact />;
}
