import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSkill} from "../utlis/addSkill";
import SkillLine from "./SkillLine";
import {MdAddCircle} from "react-icons/md";

const SkillsGroup = ({title}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {skillType.skills.map((skill, index) => (
        <SkillLine key={index} skill={skill} title={title} index={index}/>
      ))}
      {/* Add new skill button */}
      <button type="button" onClick={() => addSkill(title, setResumeData)}
              aria-label="Add"
              className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default SkillsGroup;
