import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { cn } from "@/lib/utils";

type WhatsAppLinkProps = ComponentProps<"a"> & {
  size?: "default" | "lg";
  appearance?: "whatsapp" | "primary" | "outline" | "light";
  hideIcon?: boolean;
};

export function WhatsAppLink({
  className,
  size = "lg",
  appearance = "whatsapp",
  hideIcon,
  children,
  ...props
}: WhatsAppLinkProps) {
  const appearanceClass = {
    whatsapp:
      "border-transparent bg-[#128C7E] text-white hover:bg-[#0e6e63]",
    primary: "",
    outline: "bg-background",
    light:
      "border-transparent bg-signal text-navy hover:bg-[#ffd84a]",
  }[appearance];

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: appearance === "primary" ? "default" : "outline",
          size,
        }),
        "h-12 rounded-full px-5 text-base",
        appearanceClass,
        className,
      )}
      {...props}
    >
      {hideIcon ? null : <WhatsAppIcon className="size-4" />}
      {children}
    </a>
  );
}
