import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import EditorSection from "../../ui/EditorSection";

const PersonalInformation = ({}) => {
  const {resumeData, handleProfilePicture, handleChange} =
    useContext(ResumeContext);

  return (
    <EditorSection
      title="Personal information"
      description="Core identity and contact details used across the document."
    >
      <div className="editor-grid-2">
        <div className="pi-field">
          <label className="pi-label">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Marcus Hall"
            name="name"
            className="pi"
            value={resumeData.name}
            onChange={handleChange}
          />
        </div>
        <div className="pi-field">
          <label className="pi-label">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            name="position"
            className="pi"
            value={resumeData.position}
            onChange={handleChange}
          />
        </div>
        <div className="pi-field">
          <label className="pi-label">Phone Number</label>
          <input
            type="text"
            placeholder="+1-555-0100"
            name="contactInformation"
            className="pi"
            value={resumeData.contactInformation}
            onChange={handleChange}
            minLength="10"
            maxLength="15"
          />
        </div>
        <div className="pi-field">
          <label className="pi-label">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            name="email"
            className="pi"
            value={resumeData.email}
            onChange={handleChange}
          />
        </div>
        <div className="pi-field">
          <label className="pi-label">Location</label>
          <input
            type="text"
            placeholder="City, State"
            name="address"
            className="pi"
            value={resumeData.address}
            onChange={handleChange}
          />
        </div>
        <div className="pi-field">
          <label className="pi-label">Portfolio Website</label>
          <input
            type="text"
            placeholder="https://yoursite.com"
            name="portfolioWebsite"
            className="pi"
            value={resumeData.portfolioWebsite || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </EditorSection>
  );
};

export default PersonalInformation;
