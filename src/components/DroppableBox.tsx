import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { handleDragEnd } from "../utils/tools";

const DroppableBox = () => {
  type GroupItems = Record<string, Array<{ id: string; content: string }>>;

  const [groupItems, setGroupItems] = useState<GroupItems>({
    group1: [{ id: "item-1", content: "Item 1" }],
    group2: [{ id: "item-2", content: "Item 2" }],
  });

  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, [groups]);

  return (
    <div className="droppable-box text-slate-50 w-screen p-16 border-2 border-sky-400 m-8 h-screen">
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, groupItems, setGroupItems)}
      >
        <div className="groups-container flex flex-wrap w-screen gap-7">
          {groups.map((group) => (
            <Droppable droppableId={group} key={group}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="group p-6 border-2 border-sky-400 w-64 max-w-xs rounded-lg"
                >
                  <h2 className="group-title text-teal-200">{group}</h2>
                  {groupItems[group]?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="todo"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DroppableBox;
