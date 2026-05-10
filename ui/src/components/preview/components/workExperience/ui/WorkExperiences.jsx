import React, {useContext} from 'react';
import dynamic from "next/dynamic";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import DocumentSection from "../../../../ui/DocumentSection";

const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  {ssr: false}
);

const WorkExperiences = () => {
  const {resumeData} = useContext(ResumeContext);

  return (
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <DocumentSection title="Work Experience" editable>
            {resumeData.workExperience.map((item, index) => (
              <WorkExperience
                key={index}
                item={item}
                index={index}
              />
            ))}
          </DocumentSection>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default WorkExperiences;
