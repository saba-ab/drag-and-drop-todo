import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import {
  handleDragEnd, // This function might need to be updated to handle group reordering
  handleCopyTodo,
  handleDeleteTodo,
} from "../utils/tools";
import { Groups } from "../utils/tools";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { Button } from "@mui/material";
const DroppableBox = () => {
  const [groups, setGroups] = useState<Groups>([]);
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
  const deleteGroup = (groupName: string) => {
    const updatedGroups = groups.filter(
      (group) => group.groupName !== groupName
    );
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  return (
    <div className="droppable-box text-slate-50 w-full p-16 border-2 border-sky-400 m-8 h-screen">
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, groups, setGroups)}
      >
        <Droppable droppableId="all-groups" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="groups-container flex flex-wrap w-screen gap-7"
            >
              {groups.map((group, index) => (
                <Draggable
                  key={group.groupName}
                  draggableId={group.groupName}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="group"
                    >
                      <div className="group-tittle flex justify-between">
                        <h2
                          {...provided.dragHandleProps}
                          className="group-title text-teal-200"
                        >
                          {group.groupName}
                        </h2>
                        <div
                          className="delete-group"
                          onClick={() => deleteGroup(group.groupName)}
                        >
                          <Button variant="text" color="error">
                            remove
                          </Button>
                        </div>
                      </div>

                      <Droppable droppableId={group.groupName} type="todo">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className=" flex flex-col p-6 border-2 border-sky-400 relative min-w-fit h-fit max-w-xs rounded-lg gap-3"
                          >
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DroppableBox;
