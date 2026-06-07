import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import React, { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ResumeContext } from "../../builder";
import DefaultResumeData from "../../utility/DefaultResumeData";

/* ─── fields this app knows about ─── */
const STRING_FIELDS = new Set([
  'name', 'position', 'contactInformation', 'email',
  'address', 'profilePicture', 'portfolioWebsite', 'summary',
]);
const ARRAY_FIELDS = new Set([
  'socialMedia', 'workExperience', 'education', 'skills',
  'projects', 'languages', 'certifications',
]);
const ALL_FIELDS = new Set([...STRING_FIELDS, ...ARRAY_FIELDS]);

const EMPTY_BASE = {
  name: '', position: '', contactInformation: '', email: '',
  address: '', profilePicture: '', portfolioWebsite: '', summary: '',
  socialMedia: [], workExperience: [], education: [],
  skills: [], projects: [], languages: [], certifications: [],
};

function sanitize(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  if (!Object.keys(raw).some(k => ALL_FIELDS.has(k))) return null;

  const out = { ...EMPTY_BASE };
  for (const key of ALL_FIELDS) {
    if (!(key in raw)) continue;
    if (ARRAY_FIELDS.has(key)) {
      out[key] = Array.isArray(raw[key]) ? raw[key] : [];
    } else {
      const v = raw[key];
      out[key] = v != null ? String(v) : '';
    }
  }
  return out;
}

/* ─── toast popup ─── */
function Toast({ msg, onDismiss }) {
  if (!msg) return null;
  const isError = msg.type === 'error';

  return createPortal(
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        animation: 'toastIn 200ms ease-out',
        minWidth: '260px',
        maxWidth: '420px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.625rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.625rem',
          background: isError ? '#FEF2F2' : '#F0FDF4',
          border: `1px solid ${isError ? '#FECACA' : '#BBF7D0'}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          color: isError ? '#B91C1C' : '#15803D',
          fontSize: '0.8125rem',
          fontWeight: 500,
          lineHeight: 1.45,
        }}
      >
        <span style={{ flexShrink: 0, marginTop: '1px' }}>
          {isError
            ? <FiAlertCircle size={16} />
            : <FiCheckCircle size={16} />}
        </span>
        <span style={{ flex: 1 }}>{msg.text}</span>
        <button
          onClick={onDismiss}
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.6,
            padding: 0,
            lineHeight: 1,
          }}
          aria-label="Dismiss"
        >
          <FiX size={15} />
        </button>
      </div>
    </div>,
    document.body
  );
}

const LoadUnload = ({ compact = false }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const [msg, setMsg] = useState(null);

  const flash = (type, text) => {
    clearTimeout(timerRef.current);
    setMsg({ type, text });
    timerRef.current = setTimeout(() => setMsg(null), 4000);
  };

  const handleLoad = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (inputRef.current) inputRef.current.value = '';

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const clean = sanitize(parsed);
        if (!clean) {
          flash('error', 'File format not recognised. Please load a valid ATSResume JSON.');
          return;
        }
        setResumeData(clean);
        flash('ok', 'Resume loaded successfully.');
      } catch {
        flash('error', 'Could not read file — invalid JSON.');
      }
    };
    reader.onerror = () => flash('error', 'Failed to read the file.');
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    const hasData = resumeData.name || resumeData.workExperience?.length > 0;
    if (hasData && !window.confirm('Replace the current draft with sample data?')) return;
    setResumeData(DefaultResumeData);
    flash('ok', 'Sample resume loaded — feel free to edit it.');
  };

  const handleDownload = (data, filename, e) => {
    e.preventDefault();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const content = (
    <>
      <Toast msg={msg} onDismiss={() => setMsg(null)} />
      <div className="load-unload-row">
        <label className="load-data-btn cursor-pointer">
          <FaCloudUploadAlt className="text-base" />
          Load Data
          <input
            ref={inputRef}
            aria-label="Load Data"
            type="file"
            className="hidden"
            onChange={handleLoad}
            accept=".json"
          />
        </label>

        <button
          aria-label="Save Data"
          className="save-data-btn"
          onClick={(e) =>
            handleDownload(resumeData, (resumeData.name || 'resume') + ' by ATSResume.json', e)
          }
        >
          <FaCloudDownloadAlt className="text-base" />
          Save Data
        </button>
      </div>

      <button
        aria-label="Load sample resume"
        className="sample-data-btn"
        onClick={handleLoadSample}
      >
        <span className="sample-data-line" aria-hidden="true" />
        <span className="sample-data-inner">
          {/* sparkle icon */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
          </svg>
          Try sample data
        </span>
        <span className="sample-data-line" aria-hidden="true" />
      </button>
    </>
  );

  if (compact) return content;

  return (
    <div className="section-card mb-4">
      <p className="text-[0.6rem] theme-muted-text uppercase tracking-widest font-semibold mb-3">Backup Data</p>
      {content}
    </div>
  );
};

export default LoadUnload;
