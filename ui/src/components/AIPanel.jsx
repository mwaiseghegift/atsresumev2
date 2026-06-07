"use client";

import { useState } from 'react';
import { customizeResume } from '../services/customizeService';
import { FiEdit2, FiChevronRight, FiX, FiZap, FiEye } from 'react-icons/fi';

/* ─── circular match-score gauge ─── */
function MatchGauge({ score }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color  = score >= 80 ? '#059669' : score >= 60 ? '#D97706' : '#DC2626';
  const label  = score >= 80 ? 'Great Match' : score >= 60 ? 'Good Match' : score >= 40 ? 'Fair Match' : 'Poor Match';

  return (
    <div className="match-score-container">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E5E7EB" strokeWidth="9" />
        <circle
          cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="60" y="65" textAnchor="middle" fontSize="24" fontWeight="800" fill="#111827">{score}%</text>
      </svg>
      <span className="text-sm font-semibold mt-0.5" style={{ color }}>{label}</span>
    </div>
  );
}

/* ─── small sparkle icon (inline svg avoids extra import) ─── */
function SparkleIcon({ size = 18, color = '#0D9488' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
    </svg>
  );
}

/* ─── shared input className ─── */
const inputCls = 'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-900 bg-white transition-shadow';

/* ════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════ */
export default function AIPanel({ resumeData, onCustomized, forceView, setForceView, onClose }) {
  const [localView, setLocalView] = useState('idle'); // idle | form | loading | results
  const [error,     setError]     = useState('');
  const [result,    setResult]    = useState(null);
  const [savedJob,  setSavedJob]  = useState(null);
  const [formData,  setFormData]  = useState({
    jobTitle: '', jobCompany: '', jobLocation: '',
    jobType: 'Full-time', jobDescription: '', jobRequirements: '',
  });

  // Allow parent to force the form open (e.g. via sub-bar "Customize for Job" btn)
  const view    = forceView ?? localView;
  const setView = (v) => { setLocalView(v); if (setForceView) setForceView(null); };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAnalyze = async () => {
    setView('loading');
    setError('');
    try {
      const data = await customizeResume({ resumeData, formData, saveToDb: false });
      if (!data.success) throw new Error(data.error || 'Customization failed');
      setSavedJob({ title: formData.jobTitle, company: formData.jobCompany, location: formData.jobLocation, type: formData.jobType });
      setResult(data);
      setView('results');
    } catch (err) {
      setError(err.message);
      setView('form');
    }
  };

  const handleApplyAll = () => {
    if (onCustomized && result) onCustomized(result.customized_data, result);
  };

  const isFormValid = formData.jobTitle.trim() && formData.jobDescription.trim();

  /* ── IDLE ── */
  if (view === 'idle') return (
    <aside className="ai-panel exclude-print">
      <div className="ai-panel-header">
        <h2 className="ai-panel-title"><SparkleIcon /> AI Assistant</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center gap-4 ai-panel-body">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#CCFBF1' }}>
          <SparkleIcon size={26} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Set your target job</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[220px]">
            Paste a job description and let AI analyse your resume&rsquo;s ATS match score and suggest targeted improvements.
          </p>
        </div>
        <button onClick={() => setView('form')} className="btn-teal btn-teal-sm w-full">
          <FiZap size={13} /> Customize for Job
        </button>
      </div>
    </aside>
  );

  /* ── FORM ── */
  if (view === 'form') return (
    <aside className="ai-panel exclude-print">
      <div className="ai-panel-header">
        <h2 className="ai-panel-title"><SparkleIcon /> AI Assistant</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <FiX size={17} />
        </button>
      </div>
      <div className="ai-panel-body p-4 flex flex-col gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Job Title *</label>
          <input name="jobTitle" value={formData.jobTitle} onChange={handleChange}
            placeholder="e.g., Frontend Developer" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Company</label>
            <input name="jobCompany" value={formData.jobCompany} onChange={handleChange}
              placeholder="e.g., Acme Inc." className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
            <input name="jobLocation" value={formData.jobLocation} onChange={handleChange}
              placeholder="e.g., Nairobi" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Employment Type</label>
          <select name="jobType" value={formData.jobType} onChange={handleChange} className={inputCls}>
            {['Full-time','Part-time','Contract','Internship','Remote'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Job Description *</label>
          <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}
            rows={6} placeholder="Paste the full job description here…"
            className={`${inputCls} resize-none`} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Requirements <span className="font-normal text-gray-400">(optional)</span></label>
          <textarea name="jobRequirements" value={formData.jobRequirements} onChange={handleChange}
            rows={3} placeholder="Specific skills or qualifications…"
            className={`${inputCls} resize-none`} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">{error}</div>
        )}

        <div className="flex gap-2 pt-1">
          <button onClick={handleAnalyze} disabled={!isFormValid}
            className="btn-teal flex-1 disabled:opacity-50 disabled:cursor-not-allowed justify-center">
            <FiZap size={13} /> Analyse
          </button>
          <button onClick={onClose} className="btn-outline flex-1 justify-center">
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );

  /* ── LOADING ── */
  if (view === 'loading') return (
    <aside className="ai-panel exclude-print">
      <div className="ai-panel-header">
        <h2 className="ai-panel-title"><SparkleIcon /> AI Assistant</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-6 gap-4 ai-panel-body">
        <div className="w-11 h-11 rounded-full border-[3px] border-teal-100 border-t-teal-600 animate-spin" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">Analysing your resume…</p>
          <p className="text-xs text-gray-500 mt-1">AI is comparing with the job description</p>
        </div>
      </div>
    </aside>
  );

  /* ── RESULTS ── */
  if (view === 'results' && result) {
    const score    = Math.round(result.match_score ?? 0);
    const kw       = result.keywords_analysis ?? {};
    const missing  = kw.missing  ?? [];
    const matched  = kw.matched  ?? [];
    const weak     = kw.weak     ?? [];
    const suggestions = result.ai_suggestions ?? [];

    return (
      <aside className="ai-panel exclude-print">
        <div className="ai-panel-header">
          <h2 className="ai-panel-title"><SparkleIcon /> AI Assistant</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={17} />
          </button>
        </div>

        <div className="ai-panel-body">
          {/* Target job */}
          {savedJob && (
            <div className="ai-section">
              <div className="flex items-center justify-between mb-1.5">
                <p className="ai-section-label">Target Job</p>
                <button onClick={() => setView('form')}
                  className="text-xs flex items-center gap-1 font-medium transition-colors"
                  style={{ color: '#0D9488' }}>
                  <FiEdit2 size={10} /> Edit
                </button>
              </div>
              <p className="text-sm font-bold text-gray-900">{savedJob.title}</p>
              {savedJob.company  && <p className="text-xs text-gray-600 mt-0.5">{savedJob.company}</p>}
              {(savedJob.location || savedJob.type) && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {[savedJob.location, savedJob.type].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>
          )}

          {/* Match score */}
          <div className="ai-section">
            <p className="ai-section-label">ATS Match Score</p>
            <div className="flex justify-center py-1.5">
              <MatchGauge score={score} />
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {[
                { val: matched.length, label: 'Matched', color: '#059669' },
                { val: missing.length, label: 'Missing',  color: '#D97706' },
                { val: weak.length,    label: 'Weak',     color: '#DC2626' },
              ].map(({ val, label, color }) => (
                <div key={label} className="text-center">
                  <p className="text-base font-bold" style={{ color }}>{val || '—'}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          {(missing.length > 0 || matched.length > 0) && (
            <div className="ai-section">
              <p className="ai-section-label">Keywords</p>
              {missing.length > 0 && (
                <div className="mb-2.5">
                  <p className="text-xs text-gray-500 mb-1.5">Top missing keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.slice(0, 7).map((kw, i) => (
                      <span key={i} className="kw-chip kw-missing">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {matched.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Strong matches</p>
                  <div className="flex flex-wrap gap-1.5">
                    {matched.slice(0, 7).map((kw, i) => (
                      <span key={i} className="kw-chip kw-matched">✓ {kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI suggestions */}
          {suggestions.length > 0 && (
            <div className="ai-section">
              <div className="flex items-center justify-between mb-1.5">
                <p className="ai-section-label">AI Suggestions</p>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: '#CCFBF1', color: '#0D9488' }}>
                  {suggestions.length}
                </span>
              </div>
              {suggestions.map((s, i) => (
                <div key={i} className="ai-sugg-row">
                  <div className="ai-sugg-title">
                    <span style={{ color: '#0D9488', fontSize: '0.6rem' }}>✦</span>
                    {typeof s === 'string' ? s : s.title}
                  </div>
                  <FiChevronRight size={13} className="text-gray-300 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Notes fallback when no structured suggestions */}
          {suggestions.length === 0 && result.customization_notes && (
            <div className="ai-section">
              <p className="ai-section-label">Customization Notes</p>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                {result.customization_notes.slice(0, 420)}
                {result.customization_notes.length > 420 ? '…' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Sticky action buttons */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2 shrink-0">
          <button onClick={handleApplyAll} className="btn-teal w-full justify-center">
            <FiZap size={13} /> Apply all changes
          </button>
          <button onClick={() => setView('form')} className="btn-outline w-full justify-center">
            <FiEye size={13} /> Customize again
          </button>
        </div>
      </aside>
    );
  }

  return null;
}
