import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import DocumentSection from "../../ui/DocumentSection";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills && skills.length > 0 && (
      <DocumentSection title={title} editable onBlur={handleTitleChange}>
        <p className="sub-content leading-relaxed">{skills.join(", ")}</p>
      </DocumentSection>
    )
  );
};

export default Skills;
