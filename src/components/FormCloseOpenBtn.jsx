import React from "react";
import { BsLayoutSidebarReverse, BsLayoutSidebar } from "react-icons/bs";

const FormCloseOpenBtn = ({ formClose, setFormClose }) => {
  return (
    <button
      aria-label="Form Open/Close"
      className="exclude-print fixed bottom-6 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white shadow-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-fuchsia-500/40 hover:shadow-fuchsia-900/30 transition-all duration-200"
      onClick={() => setFormClose(!formClose)}
    >
      {formClose
        ? <><BsLayoutSidebar className="text-fuchsia-400 text-base" /><span>Show Form</span></>
        : <><BsLayoutSidebarReverse className="text-fuchsia-400 text-base" /><span>Hide Form</span></>}
    </button>
  );
};

export default FormCloseOpenBtn;

