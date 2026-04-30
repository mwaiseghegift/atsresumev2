import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addLanguage} from "../utils/addLanguage";
import LanguageLine from "../components/LanguageLine";
import {MdAddCircle} from "react-icons/md";

const Languages = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO replace hardcoded variables

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Languages</h2>
      {resumeData["languages"].map((lang, index) => (
        <LanguageLine
          key={index}
          lang={lang}
          resumeData={resumeData}
          setResumeData={setResumeData}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addLanguage(resumeData, setResumeData, "languages")
              }}
              aria-label="Add"
              className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default Languages;
