import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import dynamic from "next/dynamic";
import DocumentSection from "../../ui/DocumentSection";

const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const LeftSide = ({ resumeData }) => {
  return (
    <div className="space-y-1.5">
      {resumeData.summary.length > 0 && (
        <DocumentSection title="Summary">
          <p className="content wrap-break-word leading-relaxed">{resumeData.summary}</p>
        </DocumentSection>
      )}

      {resumeData.education.length > 0 && (
        <DocumentSection title="Education">
          {resumeData.education.map((item, index) => (
            <div key={index} className="document-item">
              <p className="document-item-title">{item.degree}</p>
              <p className="document-item-subtitle">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              />
            </div>
          ))}
        </DocumentSection>
      )}

      <Droppable droppableId="skills" type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {resumeData.skills.map((skill, index) => (
              <Draggable
                key={`SKILLS-${index}`}
                draggableId={`SKILLS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-1 ${
                      snapshot.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                  >
                    <Skills title={skill.title} skills={skill.skills} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Language title="Languages" languages={resumeData.languages} />
      <Certification
        title="Certifications"
        certifications={resumeData.certifications}
      />
    </div>
  );
};

export default LeftSide;
