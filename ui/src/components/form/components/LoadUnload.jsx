import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import React, { useContext } from "react";
import {ResumeContext} from "../../builder";

const LoadUnload = ({ compact = false }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // load backup resume data
  const handleLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const resumeData = JSON.parse(event.target.result);
      setResumeData(resumeData);
    };
    reader.readAsText(file);
  };

  // download resume data
  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const content = (
    <div className="load-unload-row">
      <label className="load-data-btn cursor-pointer">
        <FaCloudUploadAlt className="text-base" />
        Load Data
        <input
          aria-label="Load Data"
          type="file"
          className="hidden"
          onChange={handleLoad}
          accept=".json"
        />
      </label>

      <button
        aria-label="Save Data"
        className="save-data-btn"
        onClick={(event) =>
          handleDownload(
            resumeData,
            resumeData.name + " by ATSResume.json",
            event
          )
        }
      >
        <FaCloudDownloadAlt className="text-base" />
        Save Data
      </button>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <div className="section-card mb-4">
      <p className="text-[0.6rem] theme-muted-text uppercase tracking-widest font-semibold mb-3">Backup Data</p>
      {content}
    </div>
  );
};

export default LoadUnload;
