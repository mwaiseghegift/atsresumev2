import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import EditorSection from "../../ui/EditorSection";

const Summary = () => {
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  return (
    <EditorSection
      title="Professional summary"
      description="Set the tone of the resume with a concise, outcome-focused overview."
    >
      <div className="editor-grid-2">
        <textarea
          placeholder="Summary"
          name="summary"
          className="w-full other-input h-40 editor-field-span-2"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
      </div>
    </EditorSection>
  );
};

export default Summary;
