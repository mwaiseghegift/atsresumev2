import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import {MdAddCircle} from "react-icons/md";
import {addWorkExperience} from "../units/addWorkExperience";
import EditorSection from "../../../../ui/EditorSection";

const WorkExperiences = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  return (
    <EditorSection
      title="Work experience"
      description="Use strong verbs, measurable outcomes, and concise achievements."
      actions={(
        <button type="button"
                onClick={() => {
                  addWorkExperience(resumeData, setResumeData)
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Role
        </button>
      )}
    >
      {resumeData.workExperience.map((workExperience, index) => (
        <WorkExperience
          key={index}
          workExperience={workExperience}
          index={index}
        />
      ))}
    </EditorSection>
  );
};

export default WorkExperiences;
