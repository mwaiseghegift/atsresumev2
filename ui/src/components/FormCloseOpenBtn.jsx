import React from "react";
import { BsLayoutSidebarReverse, BsLayoutSidebar } from "react-icons/bs";

const FormCloseOpenBtn = ({ formClose, setFormClose }) => {
  return (
    <button
      aria-label="Form Open/Close"
      className="exclude-print theme-button-soft fixed bottom-6 left-5 z-50 flex items-center gap-2 px-4 py-2.5 text-sm shadow-xl"
      onClick={() => setFormClose(!formClose)}
    >
      {formClose
        ? <><BsLayoutSidebar className="theme-accent-text text-base" /><span>Show Form</span></>
        : <><BsLayoutSidebarReverse className="theme-accent-text text-base" /><span>Hide Form</span></>}
    </button>
  );
};

export default FormCloseOpenBtn;

