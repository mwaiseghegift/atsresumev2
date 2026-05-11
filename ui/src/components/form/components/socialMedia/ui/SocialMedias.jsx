import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import EditorSection from "../../../../ui/EditorSection";

const SocialMedias = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <EditorSection
      title="Social links"
      description="Add the professional profiles you want to surface in the header."
    >
      <div className="social-media-list">
        {resumeData.socialMedia.map((socialMedia, index) => (
          <SocialMedia
            key={index}
            socialMedia={socialMedia}
            index={index}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => addSocialMedia(resumeData, setResumeData)}
        className="add-profile-btn"
      >
        <span className="add-profile-icon">+</span>
        Add Profile
      </button>
    </EditorSection>
  );
};

export default SocialMedias;
