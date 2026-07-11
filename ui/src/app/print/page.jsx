"use client";

import { useEffect, useState } from "react";
import { ResumeContext } from "../../components/builder";
import A4PageWrapper from "../../components/preview/components/A4PageWrapper";
import Template1 from "../../components/preview/templates/Template1";
import Template2 from "../../components/preview/templates/Template2";
import Template3 from "../../components/preview/templates/Template3";
import { DEFAULT_TEMPLATE_ID } from "../../constants/templates";

const TEMPLATE_COMPONENTS = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
};

const noop = () => {};

/**
 * Headless render target for PDF export — not part of the normal app UI.
 * The PDF export service (api/core/pdf_service.py) drives a headless
 * Chromium instance here, injecting the resume data via
 * `window.__PRINT_RESUME_DATA__` / `window.__PRINT_TEMPLATE__` before
 * navigation, then captures a PDF with the same print CSS the on-screen
 * preview uses. No builder chrome, no site nav — just the resume.
 *
 * Reading window on mount (not during the initial render) is deliberate:
 * it keeps the server-rendered HTML and the client's first hydration pass
 * identical, avoiding a React hydration mismatch. The injected data is
 * already present by the time this effect runs, since Playwright's
 * add_init_script executes before any of the page's own scripts.
 */
export default function PrintPage() {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const resumeData = typeof window !== "undefined" ? window.__PRINT_RESUME_DATA__ : null;
    const template = typeof window !== "undefined" ? window.__PRINT_TEMPLATE__ : null;
    if (resumeData) {
      setPayload({ resumeData, template: template || DEFAULT_TEMPLATE_ID });
    }
  }, []);

  if (!payload) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontFamily: "sans-serif" }}>
        This page renders a resume for PDF export and expects data from the export service.
      </div>
    );
  }

  const TemplateComponent = TEMPLATE_COMPONENTS[payload.template] ?? TEMPLATE_COMPONENTS[DEFAULT_TEMPLATE_ID];

  return (
    <ResumeContext.Provider
      value={{
        resumeData: payload.resumeData,
        setResumeData: noop,
        handleProfilePicture: noop,
        handleChange: noop,
        template: payload.template,
        zoomMode: "100",
        onFitScaleChange: noop,
      }}
    >
      <div className="document-stage" data-print-ready="true">
        <A4PageWrapper>
          <TemplateComponent resumeData={payload.resumeData} setResumeData={noop} />
        </A4PageWrapper>
      </div>
    </ResumeContext.Provider>
  );
}
