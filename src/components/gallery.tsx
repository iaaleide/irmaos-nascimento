"use client";

import { useState } from "react";
import { gallery } from "@/lib/business";

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  const current = gallery.find((item) => item.src === open);

  return (
    <>
      <div className="mosaic">
        {gallery.slice(0, 5).map((item) => (
          <button
            key={item.src}
            type="button"
            className="photo-zoom relative min-h-40 rounded-xl border-0 bg-navy p-0 text-left"
            onClick={() => setOpen(item.src)}
          >
            <img src={item.src} alt={item.alt} />
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/80 to-transparent p-3 text-sm text-white">
              {item.alt}
            </span>
          </button>
        ))}
      </div>
      {current ? (
        <button
          type="button"
          className="lightbox"
          onClick={() => setOpen(null)}
          aria-label="Fechar foto"
        >
          <img src={current.src} alt={current.alt} />
        </button>
      ) : null}
    </>
  );
}
