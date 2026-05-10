/* eslint-disable react/jsx-no-undef */
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube,} from "react-icons/fa";
import {CgWebsite} from "react-icons/cg";
import React, {useContext, useState} from "react";
import {ResumeContext} from "../../builder";
import dynamic from "next/dynamic";
import ModalHighlightMenu from "../components/ModalHighlightMenu";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import A4PageWrapper from "../components/A4PageWrapper";
import {onDragEndHandler} from "../utils/onDrugEndHandler";

const DragDropContext = dynamic(
  () =>
    import("@hello-pangea/dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  {ssr: false}
);

const Preview = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const icons = [
    {name: "github", icon: <FaGithub/>},
    {name: "linkedin", icon: <FaLinkedin/>},
    {name: "twitter", icon: <FaTwitter/>},
    {name: "facebook", icon: <FaFacebook/>},
    {name: "instagram", icon: <FaInstagram/>},
    {name: "youtube", icon: <FaYoutube/>},
    {name: "website", icon: <CgWebsite/>},
  ];

  return (
    <div className="preview-scroll preview rm-padding-print overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-15rem)]">
      <div className="document-stage">
        <A4PageWrapper>
          <ModalHighlightMenu/>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Header resumeData={resumeData} icons={icons}/>
            <hr className="border-dashed my-4 border-[rgba(38,70,83,0.18)]"/>
            <div className="document-grid">
              <LeftSide resumeData={resumeData}/>
              <RightSide resumeData={resumeData}/>
            </div>
          </DragDropContext>
        </A4PageWrapper>
      </div>
    </div>
  );
};

export default Preview;
