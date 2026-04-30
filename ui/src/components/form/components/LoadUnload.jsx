import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import React, { useContext } from "react";
import {ResumeContext} from "../../builder";

const LoadUnload = () => {
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

  return (
    <div className="section-card mb-4">
      <p className="text-[0.6rem] theme-muted-text uppercase tracking-widest font-semibold mb-3">Backup Data</p>
      <div className="flex flex-row gap-3">
        <label className="flex-1 cursor-pointer group">
          <div className="theme-button-soft flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium group-hover:text-white">
            <FaCloudUploadAlt className="text-base theme-accent-text transition-colors" />
            Load Data
          </div>
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
          className="theme-button-secondary flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium group"
          onClick={(event) =>
            handleDownload(
              resumeData,
              resumeData.name + " by ATSResume.json",
              event
            )
          }
        >
          <FaCloudDownloadAlt className="text-base transition-colors" />
          Save Data
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;
