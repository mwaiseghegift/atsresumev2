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
              className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
        <MdAddCircle className="text-base"/>
        Add
      </button>
    </div>
  );
};

export default TestsAndCertifications;
