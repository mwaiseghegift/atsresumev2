import React from 'react';
import DateRange from "../../../../utility/DateRange";
import dynamic from "next/dynamic";

const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  {ssr: false}
);
const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Draggable),
  {ssr: false}
);

const WorkExperience = ({item, index}) => {
  return (
    <Draggable
      key={`${item.company}-${index}`}
      draggableId={`WORK_EXPERIENCE-${index}`}
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
            <div>
              <p className="document-item-title">{item.company}</p>
              <p className="document-item-subtitle">{item.position}</p>
            </div>
            <DateRange
              startYear={item.startYear}
              endYear={item.endYear}
              id={`work-experience-start-end-date`}
            />
          </div>
          <p className="content hyphens-auto">{item.description}</p>

          <Droppable
            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                        key={`${item.company}-${index}-${subIndex}`}
                        draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
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
  );
};

export default WorkExperience;
