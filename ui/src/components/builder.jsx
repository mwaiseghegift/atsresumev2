"use client";

import React, { createContext, useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Preview from "../components/preview/ui/Preview";
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

const BLANK_RESUME = {
  name: '', position: '', contactInformation: '', email: '',
  address: '', profilePicture: '', portfolioWebsite: '', summary: '',
  socialMedia: [], workExperience: [], education: [],
  skills: [], projects: [], languages: [], certifications: [],
};

const LS_KEY = 'atsresume_draft';

export const ResumeContext = createContext(BLANK_RESUME);

/* ─── completeness score ─── */
function calcCompleteness(d) {
  let s = 0;
  if (d.name) s += 15;
  if (d.position) s += 5;
  if (d.email) s += 10;
  if (d.contactInformation) s += 5;
  if (d.summary) s += 15;
  if (d.workExperience?.length > 0) s += 20;
  if (d.education?.length > 0) s += 15;
  if (d.skills?.length > 0) s += 10;
  if (d.socialMedia?.some(x => x.link)) s += 5;
  return Math.min(s, 100);
}

/* ─── section → component map ─── */
const SECTION_COMPONENTS = {
  personal: () => <><PersonalInformation /><SocialMedias /></>,
  summary: Summary,
  experience: WorkExperiences,
  education: Educations,
  skills: Skills,
  projects: Projects,
  certifications: TestsAndCertifications,
  languages: Languages,
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
function BuilderHeader({ user, authLoading, isSaving, saveSuccess, applySuccess, onSave, onCustomize, onLogout, onClear }) {
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

      {/* ── Status indicators ── */}
      {applySuccess && (
        <span className="flex items-center gap-1 text-sm font-medium text-teal-600 shrink-0">
          <CheckIcon /> Customization applied
        </span>
      )}
      {!applySuccess && saveSuccess && (
        <span className="flex items-center gap-1 text-sm font-medium text-green-600 shrink-0">
          <CheckIcon /> Autosaved
        </span>
      )}
      {isSaving && !saveSuccess && (
        <span className="text-sm text-gray-400 shrink-0">Saving…</span>
      )}

      {/* ── Action buttons ── */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClear}
          className="builder-action-btn"
          title="Clear draft and start blank"
          style={{ color: '#9CA3AF' }}
        >
          Clear
        </button>
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

      {/* ── User section ── */}
      <div className="w-px h-5 bg-gray-200 shrink-0" />

      {authLoading ? (
        /* Skeleton while auth resolves — prevents sign-in button flash */
        <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0 animate-pulse" />
      ) : user ? (
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard"
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
            title={`${user.username} — go to dashboard`}
          >
            {initials}
          </Link>
          <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
            {user.username}
          </span>
          <button
            onClick={onLogout}
            className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
            title="Sign out"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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
  const [resumeData, setResumeData] = useState(BLANK_RESUME);
  const [activeSection, setActiveSection] = useState('personal');
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);   // controls mounting
  const [aiForceView, setAiForceView] = useState(null);    // jump-to view on open
  const [mobileTab, setMobileTab] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  /* Restore draft from localStorage after hydration (must NOT run on server) */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LS_KEY);
      if (saved) setResumeData(JSON.parse(saved));
    } catch {/* quota exceeded or private mode */ }
  }, []);

  /* Persist draft to localStorage (debounced 800 ms so we don't thrash on every keystroke) */
  const draftTimer = useRef(null);
  useEffect(() => {
    clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      try { window.localStorage.setItem(LS_KEY, JSON.stringify(resumeData)); } catch {/* quota or private mode */ }
    }, 800);
    return () => clearTimeout(draftTimer.current);
  }, [resumeData]);

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
  const handleCustomized = (customizedData) => {
    setResumeData(customizedData);
    setApplySuccess(true);
    setTimeout(() => setApplySuccess(false), 4000);
  };

  const openAiPanel = () => { setIsAiPanelOpen(true); setAiForceView('form'); setMobileTab('ai'); };
  const closeAiPanel = () => { setIsAiPanelOpen(false); setAiForceView(null); setMobileTab('edit'); };

  const handleClearDraft = () => {
    if (!window.confirm('Clear the current draft and start with a blank resume?')) return;
    try { window.localStorage.removeItem(LS_KEY); } catch {/* ignore */ }
    setResumeData(BLANK_RESUME);
  };

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
          authLoading={authLoading}
          isSaving={isSaving}
          saveSuccess={saveSuccess}
          applySuccess={applySuccess}
          onSave={handleSaveDefault}
          onCustomize={openAiPanel}
          onLogout={handleLogout}
          onClear={handleClearDraft}
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

          {/* 4 · AI assistant drawer — only rendered when open */}
          {isAiPanelOpen && (
            <>
              <div className="ai-drawer-scrim exclude-print" onClick={closeAiPanel} />
              <AIPanel
                resumeData={resumeData}
                onCustomized={handleCustomized}
                forceView={aiForceView}
                setForceView={setAiForceView}
                onClose={closeAiPanel}
              />
            </>
          )}

        </div>

        {/* ── Mobile bottom tab bar (hidden on desktop) ── */}
        <MobileTabBar mobileTab={mobileTab} setMobileTab={setMobileTab} />

      </div>
    </ResumeContext.Provider>
  );
}
