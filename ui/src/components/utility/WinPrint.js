import { MdPictureAsPdf } from "react-icons/md";
import { useContext } from "react";
import { ResumeContext } from "../builder";

const WinPrint = () => {
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
      className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-fuchsia-600 shadow-lg border-2 border-white p-2 hover:bg-fuchsia-50 hover:scale-110 transition-all duration-200"
      onClick={downloadPDF}
      title="Print / Save as PDF (Ctrl+P)"
    >
      <MdPictureAsPdf className="w-10 h-10" />
    </button>
  );
};

export default WinPrint;
