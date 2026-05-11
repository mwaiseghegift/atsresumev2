"use client";

import { useState } from "react";

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border"
          style={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors hover:bg-gray-50"
            aria-expanded={open === i}
          >
            <span className="font-medium text-sm" style={{ color: "#111827" }}>
              {q}
            </span>
            <span
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-lg leading-none transition-transform"
              style={{
                color: "#14b8a6",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {open === i && (
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              {a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
