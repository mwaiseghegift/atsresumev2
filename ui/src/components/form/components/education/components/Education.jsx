import React, {useContext} from 'react';
import {handleEducation} from "../units/handleEducation";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeEducation} from "../units/removeEducation";

const Education = ({education, index}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="editor-row">
      <div className="editor-row-fields editor-grid-2-tight">
        <input
          type="text"
          placeholder="School"
          name="school"
          className="w-full other-input"
          value={education.school}
          onChange={(e) =>
            handleEducation(resumeData, setResumeData, e, index)
          }
        />
        <input
          type="text"
          placeholder="Degree"
          name="degree"
          className="w-full other-input"
          value={education.degree}
          onChange={(e) =>
            handleEducation(resumeData, setResumeData, e, index)
          }
        />
        <div className="editor-grid-2-tight editor-field-span-2">
          <input
            type="date"
            placeholder="Start Year"
            name="startYear"
            className="flex-1 m-0 other-input"
            value={education.startYear}
            onChange={(e) =>
              handleEducation(resumeData, setResumeData, e, index)
            }
          />
          <input
            type="date"
            placeholder="End Year"
            name="endYear"
            className="flex-1 m-0 other-input"
            value={education.endYear}
            onChange={(e) =>
              handleEducation(resumeData, setResumeData, e, index)
            }
          />
        </div>
      </div>
      <div className="editor-row-action">
      <button
        type="button"
        onClick={() => {
          removeEducation(resumeData, setResumeData, index)
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

export default Education;
