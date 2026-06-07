import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addEducation} from "../units/addEducation";
import Education from "../components/Education";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const Educations = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <EditorSection
      title="Education"
      description="Keep entries concise and list the credentials most relevant to the role."
      actions={(
        <button type="button"
                onClick={() => {
                  addEducation(resumeData, setResumeData)
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Entry
        </button>
      )}
    >
      {resumeData.education?.map((education, index) => (
        <Education
          key={index}
          education={education}
          index={index}
        />
      ))}
    </EditorSection>
  )
}

export default Educations;
