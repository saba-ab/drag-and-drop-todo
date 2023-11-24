import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import {
  handleDragEnd,
  handleCopyTodo,
  handleDeleteTodo,
} from "../utils/tools";
import { GroupItems } from "../types/MainDataTypes";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
const DroppableBox = () => {
  const [groups, setGroups] = useState<GroupItems>([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, [groups]);
  const onDeleteTodo = (todoId: string, groupName: string) => {
    handleDeleteTodo(todoId, groupName, groups, setGroups);
  };

  const onCopyTodo = (todoId: string, groupName: string) => {
    handleCopyTodo(todoId, groupName, groups, setGroups);
  };
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
                  className=" flex flex-col group p-6 border-2 border-sky-400 relative min-w-fit min-h-fit max-w-xs rounded-lg gap-3"
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
                          <Todo
                            text={item.content}
                            id={item.id}
                            groupName={group.groupName}
                            onDeleteTodo={onDeleteTodo}
                            onCopy={onCopyTodo}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <TodoInput
                    groups={groups}
                    setGroups={setGroups}
                    groupName={group.groupName}
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
