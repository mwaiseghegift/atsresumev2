import React from 'react';
import LoadUnload from "../components/LoadUnload";
import PersonalInformation from "../components/PersonalInformation";
import SocialMedias from "../components/socialMedia/ui/SocialMedias";
import Summary from "../components/Summary";
import Educations from "../components/education/ui/Educations";
import WorkExperiences from "../components/workExperience/ui/WorkExperiences";
import Projects from "../components/projects/ui/Projects";
import Skills from "../components/skills/ui/Skills";
import Languages from "../components/languages/ui/Languages";
import TestsAndCertifications from "../components/testsAndCertifications/ui/TestsAndCertifications";

const Form = ({ user, onSaveDefault, isSaving, saveSuccess, formClose, setFormClose }) => {
  return (
    <form className="editor-frame relative flex flex-col exclude-print h-full">
      <div className="theme-section-divider absolute top-0 left-0 right-0 h-0.5" />
      <div className="editor-toolbar">
        <div className="editor-toolbar-grid">
          <div>
            <p className="theme-kicker">Resume Editor</p>
            <h1 className="editor-title">Build your master resume</h1>
            <p className="editor-subtitle">Structured inputs, clean spacing, and a document preview that stays aligned with what you export.</p>
          </div>
          <div className="editor-actions">
            <LoadUnload compact />
            {user && (
              <button
                type="button"
                onClick={onSaveDefault}
                disabled={isSaving}
                className="theme-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm disabled:opacity-60"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved' : 'Save to Dashboard'}</span>
              </button>
            )}
            <button
              type="button"
              className="theme-button-ghost inline-flex items-center gap-2 px-4 py-2.5 text-sm"
              onClick={() => setFormClose(!formClose)}
            >
              <span>{formClose ? 'Show Editor' : 'Hide Editor'}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="editor-scroll md:overflow-y-auto md:h-[calc(100vh-15rem)]">
        <PersonalInformation/>
        <SocialMedias/>
        <Summary/>
        <Educations/>
        <WorkExperiences/>
        <Projects/>
        <Skills/>
        <Languages/>
        <TestsAndCertifications/>
      </div>
    </form>
  );
};

export default Form;

