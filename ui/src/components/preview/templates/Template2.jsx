import React from "react";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../../utility/DateRange";

const SOCIAL_ICONS = [
  { name: "github", icon: <FaGithub /> },
  { name: "linkedin", icon: <FaLinkedin /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "facebook", icon: <FaFacebook /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "website", icon: <CgWebsite /> },
];

function SectionTitle({ children }) {
  return <h2 className="t2-section-title">{children}</h2>;
}

function Bullets({ text }) {
  if (typeof text !== "string" || text.trim().length === 0) return null;
  return (
    <ul className="t2-list">
      {text.split("\n").filter(Boolean).map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

/**
 * Template 2 — "Minimal". Single-column, ATS-safe, black/blue resume:
 * centered header, date-left/content-right entries, no photo, no sidebar.
 * Read-only: renders resumeData, no inline editing or drag-to-reorder.
 */
const Template2 = ({ resumeData }) => {
  const hasEntries = (arr) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="t2-doc">
      {/* Header */}
      <header>
        <h1 className="t2-name">{resumeData.name}</h1>
        {resumeData.position && <p className="t2-title">{resumeData.position}</p>}

        <div className="t2-contact-row mt-3">
          {resumeData.email && <span><MdEmail /> {resumeData.email}</span>}
          {resumeData.contactInformation && <span><MdPhone /> {resumeData.contactInformation}</span>}
          {resumeData.address && <span><MdLocationOn /> {resumeData.address}</span>}
        </div>

        {hasEntries(resumeData.socialMedia) && (
          <div className="t2-contact-row mt-1.5">
            {resumeData.socialMedia.map((sm, i) => {
              const iconEntry = SOCIAL_ICONS.find(
                (ic) => ic.name === sm.socialMedia?.toLowerCase()
              );
              return (
                <a
                  key={i}
                  href={sm.link?.startsWith("http") ? sm.link : `https://${sm.link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="t2-link"
                >
                  {iconEntry?.icon} {sm.link}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {/* Profile */}
      {resumeData.summary && (
        <section className="t2-section">
          <SectionTitle>Profile</SectionTitle>
          <p className="t2-entry-body">{resumeData.summary}</p>
        </section>
      )}

      {/* Skills */}
      {hasEntries(resumeData.skills) && (
        <section className="t2-section">
          <SectionTitle>Skills</SectionTitle>
          <div className="t2-skills-grid">
            {resumeData.skills.map((group, i) => (
              <div key={i}>
                <p className="t2-skills-cat-title">{group.title}</p>
                <p className="t2-skills-cat-items">{(group.skills ?? []).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {hasEntries(resumeData.education) && (
        <section className="t2-section">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, i) => (
            <div className="t2-entry" key={i}>
              <div className="t2-entry-date">
                <DateRange startYear={item.startYear} endYear={item.endYear} id={`t2-education-date-${i}`} />
              </div>
              <div className="t2-entry-content">
                <p className="t2-entry-title">
                  {item.degree}{item.degree && item.school ? ", " : ""}{item.school}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Professional Experience */}
      {hasEntries(resumeData.workExperience) && (
        <section className="t2-section">
          <SectionTitle>Professional Experience</SectionTitle>
          {resumeData.workExperience.map((item, i) => (
            <div className="t2-entry" key={i}>
              <div className="t2-entry-date">
                <DateRange startYear={item.startYear} endYear={item.endYear} id={`t2-experience-date-${i}`} />
              </div>
              <div className="t2-entry-content">
                <p className="t2-entry-title">
                  {item.position}{item.position && item.company ? ", " : ""}
                  <span className="t2-company">{item.company}</span>
                </p>
                {item.description && <p className="t2-entry-body">{item.description}</p>}
                <Bullets text={item.keyAchievements} />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {hasEntries(resumeData.projects) && (
        <section className="t2-section">
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((item, i) => (
            <div className="t2-entry" key={i}>
              <div className="t2-entry-date">
                <DateRange startYear={item.startYear} endYear={item.endYear} id={`t2-project-date-${i}`} />
              </div>
              <div className="t2-entry-content">
                <p className="t2-entry-title">{item.name || item.title}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="t2-link text-[11px]">
                    {item.link}
                  </a>
                )}
                {item.description && <p className="t2-entry-body">{item.description}</p>}
                <Bullets text={item.keyAchievements} />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {hasEntries(resumeData.languages) && (
        <section className="t2-section">
          <SectionTitle>Languages</SectionTitle>
          <p className="t2-plain-list">{resumeData.languages.join(", ")}</p>
        </section>
      )}

      {/* Certificates */}
      {hasEntries(resumeData.certifications) && (
        <section className="t2-section">
          <SectionTitle>Certificates</SectionTitle>
          <div className="t2-cert-grid">
            {resumeData.certifications.map((cert, i) => (
              <p className="t2-cert-item" key={i}>{cert}</p>
            ))}
          </div>
        </section>
      )}

      {/* References — standard closing convention for this template */}
      <section className="t2-section">
        <SectionTitle>References</SectionTitle>
        <p className="t2-entry-title">References will be provided upon request.</p>
      </section>
    </div>
  );
};

export default Template2;
