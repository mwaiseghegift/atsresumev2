"use client";

import React, { createContext, useState, useMemo } from "react";
import Meta from "../components/meta/Meta";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SectionNav, { SECTIONS } from "../components/SectionNav";
import AIPanel from "../components/AIPanel";
import dynamic from "next/dynamic";
import { useAuth } from "../context/AuthContext";
import { fetchCsrfToken } from "../components/utility/csrf";

// Section form components
import PersonalInformation from "../components/form/components/PersonalInformation";
import SocialMedias from "../components/form/components/socialMedia/ui/SocialMedias";
import Summary from "../components/form/components/Summary";
import Educations from "../components/form/components/education/ui/Educations";
import WorkExperiences from "../components/form/components/workExperience/ui/WorkExperiences";
import Projects from "../components/form/components/projects/ui/Projects";
import Skills from "../components/form/components/skills/ui/Skills";
import Languages from "../components/form/components/languages/ui/Languages";
import TestsAndCertifications from "../components/form/components/testsAndCertifications/ui/TestsAndCertifications";
import LoadUnload from "../components/form/components/LoadUnload";

const Print = dynamic(() => import("../components/utility/WinPrint"), { ssr: false });

export const ResumeContext = createContext(DefaultResumeData);

/* ─── completeness score ─── */
function calcCompleteness(d) {
  let s = 0;
  if (d.name)                           s += 15;
  if (d.position)                       s += 5;
  if (d.email)                          s += 10;
  if (d.contactInformation)            s += 5;
  if (d.summary)                        s += 15;
  if (d.workExperience?.length > 0)    s += 20;
  if (d.education?.length > 0)         s += 15;
  if (d.skills?.length > 0)            s += 10;
  if (d.socialMedia?.some(x => x.link)) s += 5;
  return Math.min(s, 100);
}

/* ─── section → component map ─── */
const SECTION_COMPONENTS = {
  personal:       () => <><PersonalInformation /><SocialMedias /></>,
  summary:        Summary,
  experience:     WorkExperiences,
  education:      Educations,
  skills:         Skills,
  projects:       Projects,
  certifications: TestsAndCertifications,
  languages:      Languages,
};

function SectionEditor({ section }) {
  const Component = SECTION_COMPONENTS[section];
  return Component ? <Component /> : null;
}

/* ─── check icon ─── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Builder() {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [activeSection, setActiveSection] = useState('personal');
  const [aiPanelView, setAiPanelView] = useState(null); // null = use internal state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { user } = useAuth();

  const completeness = useMemo(() => calcCompleteness(resumeData), [resumeData]);

  const activeSectionMeta = SECTIONS.find(s => s.id === activeSection);

  /* ─── save to dashboard ─── */
  const handleSaveDefault = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const csrfToken = await fetchCsrfToken();
      const res = await fetch('http://localhost:8000/api/resumes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
        body: JSON.stringify({ resume_data: resumeData }),
        credentials: 'include',
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  /* ─── profile picture ─── */
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (!(file instanceof Blob)) return;
    const reader = new FileReader();
    reader.onload = (ev) => setResumeData(prev => ({ ...prev, profilePicture: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e) =>
    setResumeData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ─── AI customization callback ─── */
  const handleCustomized = (customizedData) => {
    setResumeData(customizedData);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, handleProfilePicture, handleChange }}>
      <Meta
        title="ATSResume | Build & optimise your ATS resume"
        description="AI-powered resume builder that optimises your resume for Applicant Tracking Systems."
        keywords="ATS resume builder, AI resume, resume optimiser"
      />

      <div className="builder-layout-container">
        {/* ── Sub-bar ── */}
        <div className="builder-subbar exclude-print">
          <div className="flex items-center gap-2">
            {saveSuccess ? (
              <span className="autosave-indicator is-saved"><CheckIcon /> Saved</span>
            ) : isSaving ? (
              <span className="autosave-indicator">Saving…</span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={handleSaveDefault}
                disabled={isSaving}
                className="btn-outline btn-outline-sm"
              >
                Save
              </button>
            )}
            <button
              onClick={() => setAiPanelView('form')}
              className="btn-teal btn-teal-sm"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
              </svg>
              Customize for Job
            </button>
            <Print compact />
          </div>
        </div>

        {/* ── Main 4-column layout ── */}
        <div className="builder-layout">
          {/* 1. Section nav */}
          <SectionNav
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            completeness={completeness}
          />

          {/* 2. Section editor */}
          <div className="editor-panel light-editor">
            <div className="editor-panel-header">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="editor-panel-title">{activeSectionMeta?.label}</h2>
                  {activeSectionMeta?.desc && (
                    <p className="editor-panel-desc">{activeSectionMeta.desc}</p>
                  )}
                </div>
                <div className="shrink-0">
                  <LoadUnload compact />
                </div>
              </div>
            </div>
            <div className="editor-panel-scroll">
              <SectionEditor section={activeSection} />
            </div>
          </div>

          {/* 3. Preview */}
          <div className="preview-panel">
            <Preview />
          </div>

          {/* 4. AI panel */}
          <AIPanel
            resumeData={resumeData}
            onCustomized={handleCustomized}
            forceView={aiPanelView}
            setForceView={setAiPanelView}
          />
        </div>
      </div>
    </ResumeContext.Provider>
  );
}
