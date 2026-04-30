import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import {MdAddCircle} from "react-icons/md";

const SocialMedias = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Social Media</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <SocialMedia
          key={index}
          socialMedia={socialMedia}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addSocialMedia(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default SocialMedias;
