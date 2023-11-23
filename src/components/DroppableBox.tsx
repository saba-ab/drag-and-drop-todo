import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import {
  handleDragEnd,
  handleTodoInputChange,
  handleTodosKeyDown,
} from "../utils/tools";
import { GroupItems } from "../types/MainDataTypes";

const DroppableBox = () => {
  const [groups, setGroups] = useState<GroupItems>([]);
  const [todoValue, setTodoValue] = useState<string>("");

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, [groups]);
  return (
    <div className="droppable-box text-slate-50 w-screen p-16 border-2 border-sky-400 m-8 h-screen">
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, groups, setGroups)}
      >
        <div className="groups-container flex flex-wrap w-screen gap-7">
          {groups.map((group) => (
            <Droppable droppableId={group.groupName} key={group.groupName}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="group p-6 border-2 border-sky-400 w-64 max-w-xs rounded-lg"
                >
                  <h2 className="group-title text-teal-200">
                    {group.groupName}
                  </h2>
                  {group.items.map((item, index) => (
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
                  <input
                    style={{ width: "100%", color: "black" }}
                    type="text"
                    onChange={(e) => handleTodoInputChange(e, setTodoValue)}
                    onKeyDown={(e) =>
                      handleTodosKeyDown(
                        e,
                        todoValue,
                        groups,
                        setGroups,
                        setTodoValue,
                        group.groupName
                      )
                    }
                    value={todoValue}
                    className="todo-input"
                  />
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
