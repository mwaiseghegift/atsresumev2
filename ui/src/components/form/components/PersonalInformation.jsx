import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import EditorSection from "../../ui/EditorSection";

const PersonalInformation = ({}) => {
  const {resumeData, setResumeData, handleProfilePicture, handleChange} =
    useContext(ResumeContext);

  return (
    <EditorSection
      title="Personal information"
      description="Core identity and contact details used across the document."
    >
      <div className="editor-grid-2">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          className="pi"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
          className="pi"
          value={resumeData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="contactInformation"
          className="pi"
          value={resumeData.contactInformation}
          onChange={handleChange}
          minLength="10"
          maxLength="15"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="pi"
          value={resumeData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          className="pi"
          value={resumeData.address}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput editor-field-span-2"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
      </div>
    </EditorSection>
  );
};

export default PersonalInformation;
