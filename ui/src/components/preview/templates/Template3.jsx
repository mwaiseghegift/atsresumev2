import React from "react";
import { formatDateRange } from "../../utility/formatDateRange";

function SectionTitle({ children }) {
  return <h2 className="t3-section-title">{children}</h2>;
}

function Bullets({ text }) {
  if (typeof text !== "string" || text.trim().length === 0) return null;
  return (
    <ul className="t3-list">
      {text.split("\n").filter(Boolean).map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Template 3 — "Professional". Left-aligned, single-column running-text
 * resume with a navy accent: name + rule header, inline "Title | Date"
 * subheadings, hyphen-bulleted achievements, justified body text.
 * Read-only: renders resumeData, no inline editing or drag-to-reorder.
 */
const Template3 = ({ resumeData }) => {
  const hasEntries = (arr) => Array.isArray(arr) && arr.length > 0;

  const contactItems = [];
  if (resumeData.email) contactItems.push({ label: null, value: resumeData.email, href: `mailto:${resumeData.email}` });
  if (resumeData.contactInformation) contactItems.push({ label: null, value: resumeData.contactInformation });
  (resumeData.socialMedia ?? []).forEach((sm) => {
    if (sm.link) contactItems.push({ label: capitalize(sm.socialMedia), value: sm.link, href: sm.link.startsWith("http") ? sm.link : `https://${sm.link}` });
  });
  if (resumeData.portfolioWebsite) contactItems.push({ label: "Portfolio", value: resumeData.portfolioWebsite, href: resumeData.portfolioWebsite.startsWith("http") ? resumeData.portfolioWebsite : `https://${resumeData.portfolioWebsite}` });
  if (resumeData.address) contactItems.push({ label: null, value: resumeData.address });

  return (
    <div className="t3-doc">
      {/* Header */}
      <header>
        <h1 className="t3-name">{resumeData.name}</h1>
        <hr className="t3-name-rule" />
        {resumeData.position && <p className="t3-title">{resumeData.position}</p>}

        {contactItems.length > 0 && (
          <p className="t3-contact-line">
            {contactItems.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="t3-contact-sep">|</span>}
                {item.label && <span className="t3-contact-label">{item.label}: </span>}
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="t3-link">{item.value}</a>
                ) : (
                  <span>{item.value}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        )}
      </header>

      {/* Professional Summary */}
      {resumeData.summary && (
        <section className="t3-section">
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="t3-body">{resumeData.summary}</p>
        </section>
      )}

      {/* Technical Skills */}
      {hasEntries(resumeData.skills) && (
        <section className="t3-section">
          <SectionTitle>Technical Skills</SectionTitle>
          {resumeData.skills.map((group, i) => (
            <p className="t3-skill-line" key={i}>
              <span className="t3-skill-label">{group.title}: </span>
              {(group.skills ?? []).join(", ")}
            </p>
          ))}
        </section>
      )}

      {/* Experience */}
      {hasEntries(resumeData.workExperience) && (
        <section className="t3-section">
          <SectionTitle>Experience</SectionTitle>
          {resumeData.workExperience.map((item, i) => (
            <div className="t3-entry" key={i}>
              <p className="t3-entry-heading">{item.company}</p>
              <p className="t3-entry-subheading">
                {item.position}
                {item.position && (item.startYear || item.endYear) ? " | " : ""}
                {formatDateRange(item.startYear, item.endYear)}
              </p>
              {item.description && <p className="t3-body mt-1">{item.description}</p>}
              <Bullets text={item.keyAchievements} />
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {hasEntries(resumeData.projects) && (
        <section className="t3-section">
          <SectionTitle>Projects</SectionTitle>
          {resumeData.projects.map((item, i) => (
            <div className="t3-entry" key={i}>
              <p className="t3-entry-heading">
                {item.name || item.title}
                {(item.startYear || item.endYear) ? ` | ${formatDateRange(item.startYear, item.endYear)}` : ""}
              </p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" className="t3-link text-[11px]">{item.link}</a>
              )}
              {item.description && <p className="t3-body mt-1">{item.description}</p>}
              <Bullets text={item.keyAchievements} />
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {hasEntries(resumeData.education) && (
        <section className="t3-section">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((item, i) => (
            <div className="t3-entry" key={i}>
              <p className="t3-entry-heading">
                {item.school}
                {(item.startYear || item.endYear) ? ` | ${formatDateRange(item.startYear, item.endYear)}` : ""}
              </p>
              {item.degree && <p className="t3-entry-degree">{item.degree}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {hasEntries(resumeData.languages) && (
        <section className="t3-section">
          <SectionTitle>Languages</SectionTitle>
          <p className="t3-body" style={{ textAlign: "left" }}>{resumeData.languages.join(", ")}</p>
        </section>
      )}

      {/* Certificates */}
      {hasEntries(resumeData.certifications) && (
        <section className="t3-section">
          <SectionTitle>Certificates</SectionTitle>
          <ul className="t3-list">
            {resumeData.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Template3;
