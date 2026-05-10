import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const SocialMedias = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <EditorSection
      title="Social links"
      description="Add the professional profiles you want to surface in the header."
      actions={(
        <button type="button"
                onClick={() => {
                  addSocialMedia(resumeData, setResumeData)
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Link
        </button>
      )}
    >
      {resumeData.socialMedia.map((socialMedia, index) => (
        <SocialMedia
          key={index}
          socialMedia={socialMedia}
          index={index}
        />
      ))}
    </EditorSection>
  );
};

export default SocialMedias;
