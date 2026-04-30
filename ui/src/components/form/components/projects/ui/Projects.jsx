import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addProject} from "../utils/addProject";
import Project from "../components/Project";
import {MdAddCircle} from "react-icons/md";

const Projects = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <Project
          key={index}
          project={project}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addProject(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default Projects;
