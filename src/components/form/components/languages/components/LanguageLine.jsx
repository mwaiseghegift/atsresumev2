import React from 'react';
import {handleLanguage} from "../utils/handleLanguage";
import {BsTrash3} from "react-icons/bs";
import {removeLanguage} from "../utils/removeLanguage";

const LanguageLine = ({resumeData, setResumeData, lang, index}) => {
  // TODO replace hardcoded variables

  return (
    <div
      className="flex gap-5 items-center"
    >
      <input
        type="text"
        placeholder={"Language"}
        name="language"
        className="w-full mb-0 other-input"
        value={lang}
        onChange={(e) => handleLanguage(resumeData, setResumeData, e, index, "languages")}
      />
      <button
        type="button"
        onClick={() => {
          removeLanguage(resumeData, setResumeData, index)
        }}
        aria-label="Remove"
        className="p-2 rounded-lg border border-rose-500/30 bg-slate-800 hover:bg-rose-500/10 hover:border-rose-400/60 text-rose-400 hover:text-rose-300 text-base transition-all duration-200"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default LanguageLine;
