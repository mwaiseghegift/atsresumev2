import React, {useContext} from 'react';
import {handleSocialMedia} from "../units/handleSocialMedia";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeSocialMedia} from "../units/removeSocialMedia";

const SocialMedia = ({socialMedia, index}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  return (
    <div className="editor-row">
      <div className="editor-row-fields editor-grid-2-tight">
        <input
          type="text"
          placeholder="Social Media"
          name="socialMedia"
          className="w-full mb-0 other-input"
          value={socialMedia.socialMedia}
          onChange={(e) => handleSocialMedia(resumeData, setResumeData, e, index)}
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          className="w-full mb-0 other-input"
          value={socialMedia.link}
          onChange={(e) => handleSocialMedia(resumeData, setResumeData, e, index)}
        />
      </div>
      <div className="editor-row-action">
      <button
        type="button"
        onClick={() => {
          removeSocialMedia(resumeData, setResumeData, index)
        }}
        aria-label="Remove"
        className="theme-button-danger p-2 h-fit text-base"
      >
        <BsTrash3/>
      </button>
      </div>
    </div>
  );
};

export default SocialMedia;
