import React, {useContext} from 'react';
import {handleSocialMedia} from "../units/handleSocialMedia";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeSocialMedia} from "../units/removeSocialMedia";
import {
  FaGithub, FaLinkedin, FaTwitter, FaFacebook,
  FaInstagram, FaYoutube, FaGlobe
} from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

const PLATFORM_OPTIONS = [
  { value: 'Github',    label: 'GitHub',    Icon: FaGithub },
  { value: 'LinkedIn',  label: 'LinkedIn',  Icon: FaLinkedin },
  { value: 'Twitter',   label: 'X (Twitter)', Icon: FaTwitter },
  { value: 'Facebook',  label: 'Facebook',  Icon: FaFacebook },
  { value: 'Instagram', label: 'Instagram', Icon: FaInstagram },
  { value: 'YouTube',   label: 'YouTube',   Icon: FaYoutube },
  { value: 'Website',   label: 'Portfolio', Icon: FaGlobe },
];

const SocialMedia = ({socialMedia, index}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  const matched = PLATFORM_OPTIONS.find(
    p => p.value.toLowerCase() === (socialMedia.socialMedia || '').toLowerCase()
  );
  const PlatformIcon = matched?.Icon ?? FaGlobe;

  return (
    <div className="social-media-row">
      <div className="social-media-platform-icon">
        <PlatformIcon size={16} />
      </div>

      <select
        name="socialMedia"
        className="social-media-select"
        value={socialMedia.socialMedia}
        onChange={(e) => handleSocialMedia(resumeData, setResumeData, e, index)}
        aria-label="Platform"
      >
        {PLATFORM_OPTIONS.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
        {!matched && (
          <option value={socialMedia.socialMedia}>{socialMedia.socialMedia || 'Other'}</option>
        )}
      </select>

      <input
        type="text"
        placeholder="username or URL"
        name="link"
        className="social-media-link-input"
        value={socialMedia.link}
        onChange={(e) => handleSocialMedia(resumeData, setResumeData, e, index)}
      />

      <button
        type="button"
        onClick={() => removeSocialMedia(resumeData, setResumeData, index)}
        aria-label="Remove"
        className="social-media-delete-btn"
      >
        <FiTrash2 size={15} />
      </button>
    </div>
  );
};

export default SocialMedia;
