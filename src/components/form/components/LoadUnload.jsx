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
      <p className="text-[0.6rem] text-slate-500 uppercase tracking-widest font-semibold mb-3">Backup Data</p>
      <div className="flex flex-row gap-3">
        {/* Load */}
        <label className="flex-1 cursor-pointer group">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:border-fuchsia-500/50 hover:bg-slate-700 transition-all duration-200 text-xs text-slate-300 font-medium group-hover:text-white">
            <FaCloudUploadAlt className="text-base text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
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

        {/* Save */}
        <button
          aria-label="Save Data"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:border-emerald-500/50 hover:bg-slate-700 transition-all duration-200 text-xs text-slate-300 font-medium hover:text-white group"
          onClick={(event) =>
            handleDownload(
              resumeData,
              resumeData.name + " by ATSResume.json",
              event
            )
          }
        >
          <FaCloudDownloadAlt className="text-base text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          Save Data
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;
