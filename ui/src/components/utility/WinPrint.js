import { MdPictureAsPdf } from "react-icons/md";
import { useContext } from "react";
import { ResumeContext } from "../builder";

const WinPrint = ({ className = "", compact = false }) => {
  const { resumeData } = useContext(ResumeContext);

  const downloadPDF = () => {
    // Set document title for the PDF filename
    const originalTitle = document.title;
    const fileName = resumeData.name ? `${resumeData.name}_Resume` : 'Resume';
    document.title = fileName;
    
    // Trigger print dialog
    window.print();
    
    // Restore original title after a delay
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <button
      aria-label="Download Resume as PDF"
      className={compact
        ? `theme-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm ${className}`.trim()
        : `exclude-print theme-float-secondary fixed bottom-5 right-10 rounded-full p-2 font-bold ${className}`.trim()}
      onClick={downloadPDF}
      title="Print / Save as PDF (Ctrl+P)"
    >
      <MdPictureAsPdf className={compact ? "w-5 h-5" : "w-10 h-10"} />
      {compact && <span>Download PDF</span>}
    </button>
  );
};

export default WinPrint;
