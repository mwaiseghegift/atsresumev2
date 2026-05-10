import React, {useContext} from 'react';
import DateRange from "../../../../utility/DateRange";
import Link from "next/link";
import dynamic from "next/dynamic";
import {ResumeContext} from "../../../../builder";
import DocumentSection from "../../../../ui/DocumentSection";

const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  {ssr: false}
);
const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Draggable),
  {ssr: false}
);

const Projects = () => {
  const {resumeData} = useContext(ResumeContext);
  return (
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <DocumentSection title="Projects" editable>
            {resumeData.projects.map((item, index) => (
              <Draggable
                key={`${item.name}-${index}`}
                draggableId={`PROJECTS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`document-item ${
                      snapshot.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                  >
                  <div className="document-item-header">
                    <p className="document-item-title">{item.name || item.title}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`projects-start-end-date`}
                    />
                  </div>

                  {item.link && (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content document-link"
                    >
                      {item.link}
                    </Link>
                  )}
                  <p className="content">{item.description}</p>

                  <Droppable
                    droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                    type="PROJECTS_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="document-list content"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {typeof item.keyAchievements === "string" &&
                          item.keyAchievements
                            .split("\n")
                            .map((achievement, subIndex) => (
                              <Draggable
                                key={`${item.name}-${index}-${subIndex}`}
                                draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                                      snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                    }`}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: achievement,
                                      }}
                                      contentEditable
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
          </DocumentSection>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Projects;
