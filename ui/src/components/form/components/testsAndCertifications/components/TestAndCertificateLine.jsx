import React from 'react';
import {handleCertificate} from "../utils/handleCertificate";
import {removeLanguage} from "../../languages/utils/removeLanguage";
import {BsTrash3} from "react-icons/bs";
import {removeCertificate} from "../utils/removeCertificate";

const TestAndCertificateLine = ({resumeData, setResumeData, cert, index}) => {
  return (
    <div
      className="flex gap-5 items-center"
    >
      <input
        type="text"
        placeholder={"Test or certificate"}
        name={"Certificate"}
        className="w-full mb-0 other-input"
        value={cert}
        onChange={(e) => handleCertificate(resumeData, setResumeData, e, index)}
      />
      <button
        type="button"
        onClick={() => {
          removeCertificate(resumeData, setResumeData, index)
        }}
        aria-label="Remove"
        className="p-2 rounded-lg border border-rose-500/30 bg-slate-800 hover:bg-rose-500/10 hover:border-rose-400/60 text-rose-400 hover:text-rose-300 text-base transition-all duration-200"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default TestAndCertificateLine;
