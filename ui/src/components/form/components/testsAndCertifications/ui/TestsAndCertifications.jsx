import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addCertificate} from "../utils/addCertificate";
import TestAndCertificateLine from "../components/TestAndCertificateLine";
import {MdAddCircle} from "react-icons/md";

const TestsAndCertifications = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const title = "Tests & Certifications";

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {resumeData["certifications"].map((cert, index) => (
        <TestAndCertificateLine
          key={index}
          resumeData={resumeData}
          setResumeData={setResumeData}
          cert={cert}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addCertificate(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-sm transition-all duration-200">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default TestsAndCertifications;
