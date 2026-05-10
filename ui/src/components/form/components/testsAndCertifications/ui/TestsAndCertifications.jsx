import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addCertificate} from "../utils/addCertificate";
import TestAndCertificateLine from "../components/TestAndCertificateLine";
import {MdAddCircle} from "react-icons/md";
import EditorSection from "../../../../ui/EditorSection";

const TestsAndCertifications = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const title = "Tests & Certifications";

  return (
    <EditorSection
      title={title}
      description="Keep certifications current and directly relevant to your target role."
      actions={(
        <button type="button"
                onClick={() => {
                  addCertificate(resumeData, setResumeData)
                }}
                aria-label="Add"
                className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base"/>
          Add Item
        </button>
      )}
    >
      {resumeData["certifications"].map((cert, index) => (
        <TestAndCertificateLine
          key={index}
          resumeData={resumeData}
          setResumeData={setResumeData}
          cert={cert}
          index={index}
        />
      ))}
    </EditorSection>
  );
};

export default TestsAndCertifications;
