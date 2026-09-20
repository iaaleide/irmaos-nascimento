"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { business } from "@/lib/business";
import { links } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "A casa" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/92 backdrop-blur-md">
      <div className="h-1.5 bg-[repeating-linear-gradient(90deg,#f5c400_0_18px,#0b1f3a_18px_28px)]" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-navy text-signal shadow-sm">
            <span className="font-heading text-lg leading-none tracking-tight">IN</span>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-heading text-base tracking-wide text-stone-900 uppercase sm:text-lg">
              {business.name}
            </span>
            <span className="hidden text-xs text-stone-600 sm:block">
              Encontre o que precisa e saia feliz
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-stone-600 transition-colors hover:text-stone-950",
                pathname === item.href && "text-stone-950",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            href={links.quote}
            className="hidden h-10 px-4 text-sm sm:inline-flex"
          >
            Pedir orçamento
          </WhatsAppLink>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 md:hidden"
                  aria-label="Abrir menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,100vw)]">
              <SheetHeader>
                <SheetTitle className="font-heading text-left text-xl uppercase">
                  {business.name}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} className="text-lg font-medium" />}
                  >
                    {item.label}
                  </SheetClose>
                ))}
                <WhatsAppLink href={links.quote} className="mt-2 w-full">
                  Pedir orçamento
                </WhatsAppLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
