import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { links } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={links.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition hover:bg-[#20bd5a] touch-manipulation sm:right-6 sm:h-12 sm:w-auto sm:gap-2 sm:px-4"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <WhatsAppIcon className="size-6 sm:size-5" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
