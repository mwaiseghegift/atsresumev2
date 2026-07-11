/* eslint-disable react/jsx-no-undef */
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import React from "react";
import dynamic from "next/dynamic";
import ModalHighlightMenu from "../components/ModalHighlightMenu";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { onDragEndHandler } from "../utils/onDrugEndHandler";

const DragDropContext = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

const ICONS = [
  { name: "github", icon: <FaGithub /> },
  { name: "linkedin", icon: <FaLinkedin /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "facebook", icon: <FaFacebook /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "website", icon: <CgWebsite /> },
];

/**
 * Template 1 — "Classic". The original ATSResume layout: teal sidebar with
 * summary/education/skills, main column with work experience/projects.
 * Fully editable in place (inline text editing + drag-to-reorder).
 */
const Template1 = ({ resumeData, setResumeData }) => {
  return (
    <>
      <ModalHighlightMenu />
      <DragDropContext onDragEnd={(result) => onDragEndHandler(result, resumeData, setResumeData)}>
        <Header resumeData={resumeData} icons={ICONS} />
        <hr className="border-dashed my-4 border-[rgba(38,70,83,0.18)]" />
        <div className="document-grid">
          <LeftSide resumeData={resumeData} />
          <RightSide resumeData={resumeData} />
        </div>
      </DragDropContext>
    </>
  );
};

export default Template1;
