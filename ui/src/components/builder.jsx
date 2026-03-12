"use client"

import React, {createContext, useState} from "react";
import Meta from "../components/meta/Meta";
import FormCloseOpenBtn from "../components/FormCloseOpenBtn";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import JobCustomizer from "../components/JobCustomizer";
import dynamic from "next/dynamic";
import Form from "../components/form/ui/Form";
import { useAuth } from "../context/AuthContext";
import { fetchCsrfToken } from "../components/utility/csrf";

const ResumeContext = createContext(DefaultResumeData);

// Export the context so it can be used in other components
export { ResumeContext };

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder() {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // auth
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveDefault = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
       const csrfToken = await fetchCsrfToken();
       const res = await fetch('http://localhost:8000/api/resumes/', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken
          },
          body: JSON.stringify({ resume_data: resumeData }),
          credentials: 'include'
       });
       if(res.ok) setSaveSuccess(true);
       setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
       console.error(e);
    } finally {
       setIsSaving(false);
    }
  };

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({...resumeData, profilePicture: event.target.result});
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({...resumeData, [e.target.name]: e.target.value});
    console.log(resumeData);
  };

  // Handle customized resume data from JobCustomizer
  const handleCustomized = (customizedData, matchScore) => {
    setResumeData(customizedData);
    console.log("Resume customized with match score:", matchScore);
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        />
        <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
          {!formClose && (
            <Form/>
          )}
          <Preview/>
        </div>
        <FormCloseOpenBtn formClose={formClose} setFormClose={setFormClose}/>
        {user && (
           <button 
             onClick={handleSaveDefault}
             disabled={isSaving}
             className="exclude-print fixed top-24 right-8 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 z-40 disabled:opacity-50"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
             </svg>
             {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Default CV'}
           </button>
        )}
        <Print/>
        <JobCustomizer resumeData={resumeData} onCustomized={handleCustomized}/>
      </ResumeContext.Provider>
    </>
  );
}
