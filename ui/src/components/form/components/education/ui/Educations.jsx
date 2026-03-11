import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addEducation} from "../units/addEducation";
import Education from "../components/Education";
import {MdAddCircle} from "react-icons/md";

const Educations = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Education</h2>
      {resumeData.education.map((education, index) => (
        <Education
          key={index}
          education={education}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addEducation(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-sm transition-all duration-200">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  )
}

export default Educations;
