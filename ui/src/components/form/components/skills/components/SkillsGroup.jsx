import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSkill} from "../utlis/addSkill";
import SkillLine from "./SkillLine";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const SkillsGroup = ({title}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <EditorSection
      title={title}
      description="Use short, specific terms recruiters and ATS systems will recognize."
      actions={(
        <button type="button" onClick={() => addSkill(title, setResumeData)}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Skill
        </button>
      )}
    >
      {skillType.skills.map((skill, index) => (
        <SkillLine key={index} skill={skill} title={title} index={index}/>
      ))}
    </EditorSection>
  );
};

export default SkillsGroup;
