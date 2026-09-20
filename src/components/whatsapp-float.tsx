import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { links } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={links.general}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#20bd5a] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sm:hidden">Falar</span>
    </a>
  );
}
