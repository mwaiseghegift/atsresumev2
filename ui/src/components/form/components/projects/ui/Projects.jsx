import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addProject} from "../utils/addProject";
import Project from "../components/Project";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const Projects = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <EditorSection
      title="Projects"
      description="Highlight the work that proves depth, ownership, and execution."
      actions={(
        <button type="button"
                onClick={() => {
                  addProject(resumeData, setResumeData)
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Project
        </button>
      )}
    >
      {resumeData.projects.map((project, index) => (
        <Project
          key={index}
          project={project}
          index={index}
        />
      ))}
    </EditorSection>
  );
};

export default Projects;
