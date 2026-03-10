import React from 'react';
import LoadUnload from "../components/LoadUnload";
import PersonalInformation from "../components/PersonalInformation";
import SocialMedias from "../components/socialMedia/ui/SocialMedias";
import Summary from "../components/Summary";
import Educations from "../components/education/ui/Educations";
import WorkExperiences from "../components/workExperience/ui/WorkExperiences";
import Projects from "../components/projects/ui/Projects";
import Skills from "../components/skills/ui/Skills";
import Languages from "../components/languages/ui/Languages";
import TestsAndCertifications from "../components/testsAndCertifications/ui/TestsAndCertifications";

const Form = () => {
  return (
    <form className="relative flex flex-col p-4 pt-5 bg-slate-900 exclude-print md:max-w-[40%] md:h-screen md:overflow-y-scroll border-r border-slate-800">
      {/* Fuchsia top border accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-violet-600" />
      <LoadUnload/>
      <PersonalInformation/>
      <SocialMedias/>
      <Summary/>
      <Educations/>
      <WorkExperiences/>
      <Projects/>
      <Skills/>
      <Languages/>
      <TestsAndCertifications/>
    </form>
  );
};

export default Form;

