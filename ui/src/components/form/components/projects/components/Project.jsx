import React, {useContext} from 'react';
import {handleProject} from "../utils/handleProject";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeProject} from "../utils/removeProject";

const Project = ({project, index}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO add a title for each input
  // TODO change the "start year" to the "start date" for clarity (also in the name of variable)
  // TODO change the "end year" to the "end date" for clarity  (also in the name of variable)

  return (
    <div className="editor-row">
      <div className="editor-row-fields editor-grid-2-tight">
        <input
          type="text"
          placeholder="Project Name"
          name="name"
          className="w-full other-input"
          value={project.name || ''}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          className="w-full other-input"
          value={project.link || ''}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          className="w-full other-input h-32 editor-field-span-2"
          value={project.description || ''}
          maxLength="250"
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        <textarea
          type="text"
          placeholder="Key Achievements"
          name="keyAchievements"
          className="w-full other-input h-40 editor-field-span-2"
          value={project.keyAchievements || ''}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        <div className="editor-grid-2-tight editor-field-span-2">
          <input
            type="date"
            placeholder="Start Year"
            name="startYear"
            className="flex-1 m-0 other-input"
            value={project.startYear || ''}
            onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
          />
          <input
            type="date"
            placeholder="End Year"
            name="endYear"
            className="flex-1 m-0 other-input"
            value={project.endYear || ''}
            onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
          />
        </div>
      </div>
      <div className="editor-row-action">
      <button
        type="button"
        onClick={() => {
          removeProject(resumeData, setResumeData, index)
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

export default Project;
