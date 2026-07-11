import React, { useContext, useEffect, useRef, useState } from "react";
import { ResumeContext } from "../../builder";
import A4PageWrapper from "../components/A4PageWrapper";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import { DEFAULT_TEMPLATE_ID } from "../../../constants/templates";

/**
 * Maps template registry ids (constants/templates.js) to their renderer.
 * Add new templates here alongside a registry entry.
 */
const TEMPLATE_COMPONENTS = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
};

// .document-shell is 210mm wide (true A4, matching the @page{size:A4} print rule).
const A4_WIDTH_PX = (210 * 96) / 25.4;
// Horizontal padding to subtract when measuring available width: .preview-scroll (1.5rem * 2) + .document-stage (0.5rem * 2).
const HORIZONTAL_CHROME_PX = 48 + 16;

const Preview = () => {
  const { resumeData, setResumeData, template, zoomMode, onFitScaleChange } = useContext(ResumeContext);
  const TemplateComponent = TEMPLATE_COMPONENTS[template] ?? TEMPLATE_COMPONENTS[DEFAULT_TEMPLATE_ID];
  const scrollRef = useRef(null);
  const [fitZoom, setFitZoom] = useState(1);

  /* Keep the "fit to panel" scale current as the preview panel is resized (window resize, AI drawer open/close, mobile tab switch). */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const recompute = () => {
      const available = el.clientWidth - HORIZONTAL_CHROME_PX;
      const scale = Math.min(1, available / A4_WIDTH_PX);
      setFitZoom(scale);
      onFitScaleChange?.(Math.round(scale * 100));
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(el);
    return () => observer.disconnect();
  }, [onFitScaleChange]);

  const stageStyle = zoomMode === "fit" ? { zoom: fitZoom } : undefined;

  return (
    <div className="preview-scroll preview rm-padding-print" ref={scrollRef}>
      <div className="document-stage" style={stageStyle}>
        <A4PageWrapper>
          <TemplateComponent resumeData={resumeData} setResumeData={setResumeData} />
        </A4PageWrapper>
      </div>
    </div>
  );
};

export default Preview;
