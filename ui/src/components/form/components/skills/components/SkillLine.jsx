import React, {useContext} from 'react';
import {handleSkill} from "../utlis/handleSkill";
import {ResumeContext} from "../../../../builder";
import { BsTrash3 } from 'react-icons/bs';
import {removeSkill} from "../utlis/removeSkill";

;

const SkillLine = ({skill, title, index}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div
      className="flex gap-5 items-center"
    >
      <input
        type="text"
        placeholder={title}
        name={title}
        className="w-full mb-0 other-input"
        value={skill}
        onChange={(e) => handleSkill(e, index, title, resumeData, setResumeData)}
      />
      <button type="button" onClick={() => {
        console.log("remove", title, index)
        removeSkill(title, setResumeData, index)
      }}
              aria-label="Remove"
              className="p-2 rounded-lg border border-rose-500/30 bg-slate-800 hover:bg-rose-500/10 hover:border-rose-400/60 text-rose-400 hover:text-rose-300 text-base transition-all duration-200">
        <BsTrash3 />
      </button>
    </div>
  );
};

export default SkillLine;
