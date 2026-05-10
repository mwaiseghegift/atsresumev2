"use client";

import { FiUser, FiFileText, FiBriefcase, FiBook, FiStar, FiFolder, FiAward, FiGlobe } from 'react-icons/fi';

export const SECTIONS = [
  { id: 'personal',       label: 'Personal Info',  icon: FiUser,      desc: 'Add your contact details' },
  { id: 'summary',        label: 'Summary',         icon: FiFileText,  desc: 'Write a professional summary' },
  { id: 'experience',     label: 'Experience',      icon: FiBriefcase, desc: 'Add your work history' },
  { id: 'education',      label: 'Education',       icon: FiBook,      desc: 'List your academic background' },
  { id: 'skills',         label: 'Skills',          icon: FiStar,      desc: 'Highlight your key skills' },
  { id: 'projects',       label: 'Projects',        icon: FiFolder,    desc: 'Showcase your projects' },
  { id: 'certifications', label: 'Certifications',  icon: FiAward,     desc: 'Add certifications & tests' },
  { id: 'languages',      label: 'Languages',       icon: FiGlobe,     desc: 'List languages you speak' },
];

function CompletenessRing({ value }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 80 ? '#059669' : value >= 50 ? '#D97706' : '#9CA3AF';
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" aria-label={`Resume ${value}% complete`}>
      <circle cx="42" cy="42" r={r} fill="none" stroke="#E5E7EB" strokeWidth="6" />
      <circle
        cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 42 42)"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="42" y="47" textAnchor="middle" fontSize="17" fontWeight="800" fill="#111827">{value}%</text>
    </svg>
  );
}

export default function SectionNav({ activeSection, setActiveSection, completeness = 0 }) {
  const statusText  = completeness >= 80 ? 'Good progress!'     : completeness >= 50 ? 'Keep going!'     : 'Just starting';
  const statusColor = completeness >= 80 ? '#059669'            : completeness >= 50 ? '#D97706'          : '#9CA3AF';

  return (
    <aside className="section-nav exclude-print">
      <p className="section-nav-label">Sections</p>

      <nav className="section-nav-list">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
            className={`section-nav-item${activeSection === id ? ' section-nav-item-active' : ''}`}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="section-nav-completeness">
        <CompletenessRing value={completeness} />
        <p className="completeness-label">Resume Completeness</p>
        <p className="completeness-status" style={{ color: statusColor }}>{statusText}</p>
        <p className="completeness-hint">Add more details to reach 100%</p>
      </div>
    </aside>
  );
}
