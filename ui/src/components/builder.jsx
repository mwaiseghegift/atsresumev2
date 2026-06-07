"use client";

import React, { createContext, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  if (d.name)                            s += 15;
  if (d.position)                        s += 5;
  if (d.email)                           s += 10;
  if (d.contactInformation)             s += 5;
  if (d.summary)                         s += 15;
  if (d.workExperience?.length > 0)     s += 20;
  if (d.education?.length > 0)          s += 15;
  if (d.skills?.length > 0)             s += 10;
  if (d.socialMedia?.some(x => x.link))  s += 5;
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
  const Comp = SECTION_COMPONENTS[section];
  return Comp ? <Comp /> : null;
}

/* ─── mobile bottom tab bar ─── */
function MobileTabBar({ mobileTab, setMobileTab }) {
  const tabs = [
    {
      id: 'edit',
      label: 'Edit',
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D9488' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D9488' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 'ai',
      label: 'AI',
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#0D9488' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
          <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="mobile-tab-bar exclude-print">
      {tabs.map(({ id, label, icon }) => {
        const active = mobileTab === id;
        return (
          <button
            key={id}
            type="button"
            className={`mobile-tab-btn${active ? ' mobile-tab-btn-active' : ''}`}
            onClick={() => setMobileTab(id)}
          >
            {icon(active)}
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ─── inline SVGs ─── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
    </svg>
  );
}
function SaveIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

/* ─── builder-specific top header ─── */
function BuilderHeader({ user, isSaving, saveSuccess, onSave, onCustomize, onLogout }) {
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? '';

  return (
    /* Use Tailwind utilities directly so layout is guaranteed regardless of custom CSS loading */
    <header
      className="exclude-print flex flex-nowrap items-center gap-3 bg-white border-b border-gray-200 px-5"
      style={{ height: '64px', flexShrink: 0, zIndex: 50 }}
    >
      {/* ── Brand ── */}
      <Link href="/" className="flex items-center gap-2 shrink-0" style={{ textDecoration: 'none' }}>
        <span
          className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-sm font-black text-white"
          style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
        >
          AR
        </span>
        <span
          className="hidden sm:block text-lg font-bold"
          style={{
            background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          ATSResume
        </span>
      </Link>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-200 shrink-0" />

      {/* ── Nav links ── */}
      <nav className="flex items-center gap-0.5 shrink-0">
        <span
          className="px-3 text-sm font-semibold cursor-default"
          style={{ color: '#0D9488', borderBottom: '2px solid #0D9488', paddingBottom: '0.2rem', paddingTop: '0.375rem' }}
        >
          Builder
        </span>
        <span className="px-3 py-1.5 text-sm font-medium text-gray-400 cursor-not-allowed">Job Tracker</span>
        <span className="px-3 py-1.5 text-sm font-medium text-gray-400 cursor-not-allowed">Templates</span>
      </nav>

      {/* Spacer */}
      <div className="flex-1 min-w-0" />

      {/* ── Autosave status ── */}
      {saveSuccess && (
        <span className="flex items-center gap-1 text-sm font-medium text-green-600 shrink-0">
          <CheckIcon /> Autosaved
        </span>
      )}
      {isSaving && !saveSuccess && (
        <span className="text-sm text-gray-400 shrink-0">Saving…</span>
      )}

      {/* ── Action buttons ── */}
      <div className="flex items-center gap-2 shrink-0">
        {user && (
          <button onClick={onSave} disabled={isSaving} className="builder-action-btn">
            <SaveIcon /> Save
          </button>
        )}
        <button onClick={onCustomize} className="builder-action-btn builder-customize-btn">
          <SparkleIcon /> Customize for Job
        </button>
        <Print compact />
      </div>

      {/* ── User avatar / auth ── */}
      {user ? (
        <button
          onClick={onLogout}
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
          title={`${user.username} — click to logout`}
        >
          {initials}
        </button>
      ) : (
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <Link href="/register" className="btn-teal btn-teal-sm">Sign up</Link>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════
   Main Builder
   ══════════════════════════════════════════ */
export default function Builder() {
  const [resumeData, setResumeData]     = useState(DefaultResumeData);
  const [activeSection, setActiveSection] = useState('personal');
  const [aiPanelView, setAiPanelView]   = useState(null);
  const [mobileTab, setMobileTab]       = useState('edit');
  const [isSaving, setIsSaving]         = useState(false);
  const [saveSuccess, setSaveSuccess]   = useState(false);
  const { user, logout }                = useAuth();
  const router                          = useRouter();

  const completeness       = useMemo(() => calcCompleteness(resumeData), [resumeData]);
  const activeSectionMeta  = SECTIONS.find(s => s.id === activeSection);

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
        setTimeout(() => setSaveSuccess(false), 5000);
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
    reader.onload = (ev) =>
      setResumeData(prev => ({ ...prev, profilePicture: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e) =>
    setResumeData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ─── AI callback — apply customised data to preview ─── */
  const handleCustomized = (customizedData) => setResumeData(customizedData);

  /* ─── logout ─── */
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, handleProfilePicture, handleChange }}>
      <div className="builder-layout-container">

        {/* ── Full builder navbar ── */}
        <BuilderHeader
          user={user}
          isSaving={isSaving}
          saveSuccess={saveSuccess}
          onSave={handleSaveDefault}
          onCustomize={() => { setAiPanelView('form'); setMobileTab('ai'); }}
          onLogout={handleLogout}
        />

        {/* ── 3-column workspace ── */}
        <div className="builder-layout" data-mobile-tab={mobileTab}>

          {/* 1+2 · Section nav + editor merged into one column */}
          <div className="editor-column exclude-print">

          <SectionNav
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            completeness={completeness}
          />

          {/* Section editor */}
          <div className="editor-panel light-editor">
            <div className="editor-panel-header">
              <h2 className="editor-panel-title">{activeSectionMeta?.label}</h2>
              {activeSectionMeta?.desc && (
                <p className="editor-panel-desc">{activeSectionMeta.desc}</p>
              )}
              <div className="mt-3">
                <LoadUnload compact />
              </div>
            </div>
            <div className="editor-panel-scroll">
              <SectionEditor section={activeSection} />
            </div>
          </div>

          </div>{/* end editor-column */}

          {/* 3 · Resume preview */}
          <div className="preview-panel">
            <div className="preview-panel-header exclude-print">
              <span className="preview-panel-header-title">Live Preview</span>
              <div className="preview-panel-header-controls">
                <span className="preview-fit-btn">Fit</span>
                <span className="preview-zoom-badge">100%</span>
              </div>
            </div>
            <Preview />
          </div>

          {/* 4 · AI assistant — only rendered when open */}
          {aiPanelView !== null && (
            <AIPanel
              resumeData={resumeData}
              onCustomized={handleCustomized}
              forceView={aiPanelView}
              setForceView={setAiPanelView}
              onClose={() => { setAiPanelView(null); setMobileTab('edit'); }}
            />
          )}

        </div>

        {/* ── Mobile bottom tab bar (hidden on desktop) ── */}
        <MobileTabBar mobileTab={mobileTab} setMobileTab={setMobileTab} />

      </div>
    </ResumeContext.Provider>
  );
}
