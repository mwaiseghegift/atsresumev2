import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addLanguage} from "../utils/addLanguage";
import LanguageLine from "../components/LanguageLine";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const Languages = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO replace hardcoded variables

  return (
    <EditorSection
      title="Languages"
      description="Include only spoken languages that materially strengthen your candidacy."
      actions={(
        <button type="button"
                onClick={() => {
                  addLanguage(resumeData, setResumeData, "languages")
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Language
        </button>
      )}
    >
      {resumeData["languages"].map((lang, index) => (
        <LanguageLine
          key={index}
          lang={lang}
          resumeData={resumeData}
          setResumeData={setResumeData}
          index={index}
        />
      ))}
    </EditorSection>
  );
};

export default Languages;
