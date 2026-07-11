"use client";

import { useContext, useState } from "react";
import { ResumeContext } from "../builder";
import { downloadResumePdf } from "../../services/pdfService";

function PdfIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

/**
 * Downloads the resume as a server-generated PDF. Replaces the old
 * window.print()-based flow: that depended on the browser's print dialog
 * (margins, scale, background graphics), which produced inconsistent output
 * whenever a user's dialog settings differed from what the CSS intended.
 * This calls the backend's headless-browser export instead, which is
 * deterministic regardless of any local browser/print configuration.
 */
export default function DownloadPdfButton({ className = "" }) {
  const { resumeData, template } = useContext(ResumeContext);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  const handleDownload = async () => {
    setStatus("loading");
    try {
      await downloadResumePdf(resumeData, template);
      setStatus("idle");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={status === "loading"}
      aria-label="Download resume as PDF"
      className={`theme-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm disabled:opacity-70 disabled:cursor-wait ${className}`.trim()}
      title={status === "error" ? "Couldn't generate the PDF — try again" : "Download PDF"}
    >
      {status === "loading" ? <SpinnerIcon /> : <PdfIcon />}
      <span>
        {status === "loading" ? "Generating…" : status === "error" ? "Try again" : "Download PDF"}
      </span>
    </button>
  );
}
