"use client";

import React, { useEffect } from "react";
import { TEMPLATES, UPCOMING_TEMPLATE_SLOTS } from "../constants/templates";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** Abstract mini-diagram of Template 1's two-column layout — no real screenshot needed. */
function Template1Thumbnail() {
  return (
    <div className="w-full aspect-210/297 rounded-md overflow-hidden flex bg-white border border-gray-200">
      <div className="w-[34%] p-1.5 flex flex-col gap-1" style={{ backgroundColor: "#0D9488" }}>
        <div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.85)", width: "70%" }} />
        <div className="h-1 rounded-full mt-1.5" style={{ backgroundColor: "rgba(255,255,255,0.45)", width: "90%" }} />
        <div className="h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.45)", width: "60%" }} />
        <div className="h-1 rounded-full mt-2" style={{ backgroundColor: "rgba(255,255,255,0.45)", width: "80%" }} />
        <div className="h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.45)", width: "50%" }} />
      </div>
      <div className="flex-1 p-1.5 flex flex-col gap-1">
        <div className="h-1.5 rounded-full bg-gray-300" style={{ width: "55%" }} />
        <div className="h-1 rounded-full bg-gray-200 mt-1.5" style={{ width: "95%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "88%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "70%" }} />
        <div className="h-1.5 rounded-full bg-gray-300 mt-2" style={{ width: "45%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "92%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "80%" }} />
      </div>
    </div>
  );
}

/** Abstract mini-diagram of Template 2's centered single-column layout. */
function Template2Thumbnail() {
  return (
    <div className="w-full aspect-210/297 rounded-md overflow-hidden bg-white border border-gray-200 p-2 flex flex-col items-center gap-1">
      <div className="h-1.5 rounded-full bg-gray-400" style={{ width: "40%" }} />
      <div className="h-1 rounded-full bg-gray-300 mt-0.5" style={{ width: "30%" }} />
      <div className="h-0.5 rounded-full mt-1" style={{ width: "70%", backgroundColor: "#1d4ed8", opacity: 0.5 }} />
      <div className="w-full flex flex-col gap-1 mt-1.5">
        <div className="h-1 rounded-full bg-gray-300" style={{ width: "24%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "92%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "85%" }} />
        <div className="h-1 rounded-full bg-gray-300 mt-1.5" style={{ width: "24%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "90%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "75%" }} />
      </div>
    </div>
  );
}

/** Abstract mini-diagram of Template 3's left-aligned, navy-accented layout. */
function Template3Thumbnail() {
  return (
    <div className="w-full aspect-210/297 rounded-md overflow-hidden bg-white border border-gray-200 p-2 flex flex-col gap-1">
      <div className="h-1.5 rounded-full" style={{ width: "45%", backgroundColor: "#1e3a8a" }} />
      <div className="h-px bg-gray-300 my-0.5" style={{ width: "100%" }} />
      <div className="h-1 rounded-full bg-gray-300" style={{ width: "28%" }} />
      <div className="flex flex-col gap-1 mt-1.5">
        <div className="h-1 rounded-full" style={{ width: "22%", backgroundColor: "#1e3a8a" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "95%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "90%" }} />
        <div className="h-1 rounded-full" style={{ width: "30%", backgroundColor: "#1e3a8a" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "88%" }} />
        <div className="h-1 rounded-full bg-gray-200" style={{ width: "80%" }} />
      </div>
    </div>
  );
}

export default function TemplatePickerModal({ activeTemplateId, onSelect, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="exclude-print fixed inset-0 bg-[rgba(15,23,42,0.55)] backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-picker-heading"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 id="template-picker-heading" className="text-lg font-bold text-gray-900">Choose a template</h2>
            <p className="text-sm text-gray-500 mt-0.5">Pick the layout your resume renders and prints with.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEMPLATES.map((t) => {
            const isActive = t.id === activeTemplateId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => { onSelect(t.id); onClose(); }}
                className="text-left rounded-xl p-2.5 transition-all"
                style={{
                  border: isActive ? "2px solid #0D9488" : "2px solid #E5E7EB",
                  boxShadow: isActive ? "0 0 0 3px rgba(13,148,136,0.12)" : "none",
                }}
                aria-pressed={isActive}
              >
                <div className="relative">
                  {t.id === "template1" && <Template1Thumbnail />}
                  {t.id === "template2" && <Template2Thumbnail />}
                  {t.id === "template3" && <Template3Thumbnail />}
                  {isActive && (
                    <span
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: "#0D9488" }}
                    >
                      <CheckIcon />
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-2">{t.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{t.description}</p>
              </button>
            );
          })}

          {Array.from({ length: UPCOMING_TEMPLATE_SLOTS }).map((_, i) => (
            <div
              key={`locked-${i}`}
              className="rounded-xl p-2.5 border border-dashed border-gray-200 flex flex-col"
            >
              <div className="w-full aspect-[210/297] rounded-md bg-gray-50 flex items-center justify-center text-gray-300">
                <LockIcon />
              </div>
              <p className="text-sm font-semibold text-gray-400 mt-2">Coming soon</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">A new layout is in the works.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
