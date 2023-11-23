import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
export const handleGroupInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setGroupValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setGroupValue(e.target.value);
};
export const handleGroups = (
  groupValue: string,
  groups: string[],
  setGroups: React.Dispatch<React.SetStateAction<string[]>>,
  setGroupValue: React.Dispatch<React.SetStateAction<string>>
) => {
  if (groupValue.trim() !== "") {
    const newGroup = {
      groupName: groupValue.trim(),
      items: [],
    };

    localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
  }

  setGroupValue("");
};
export const handleGroupsKeyDown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  groupValue: string,
  groups: string[],
  setGroups: React.Dispatch<React.SetStateAction<string[]>>,
  setGroupValue: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.key === "Enter") {
    handleGroups(groupValue, groups, setGroups, setGroupValue);
  }
};

type Item = {
  id: string;
  content: string;
};

type Group = {
  groupName: string;
  items: Item[];
};

type Groups = Group[];

export const handleDragEnd = (
  result: DropResult,
  groups: Groups,
  setGroups: Dispatch<SetStateAction<Groups>>
) => {
  const { source, destination } = result;
  if (!destination) return;

  const newGroups = Array.from(groups);

  const sourceGroupIndex = newGroups.findIndex(
    (group) => group.groupName === source.droppableId
  );
  const destinationGroupIndex = newGroups.findIndex(
    (group) => group.groupName === destination.droppableId
  );

  if (sourceGroupIndex === -1 || destinationGroupIndex === -1) return;

  if (source.droppableId === destination.droppableId) {
    // Reordering within the same group
    const sourceItems = Array.from(newGroups[sourceGroupIndex].items);
    const [reorderedItem] = sourceItems.splice(source.index, 1);
    sourceItems.splice(destination.index, 0, reorderedItem);

    newGroups[sourceGroupIndex].items = sourceItems;
  } else {
    // Moving between groups
    const sourceItems = Array.from(newGroups[sourceGroupIndex].items);
    const destItems = Array.from(newGroups[destinationGroupIndex].items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, movedItem);

    newGroups[sourceGroupIndex].items = sourceItems;
    newGroups[destinationGroupIndex].items = destItems;
  }
  localStorage.setItem("groups", JSON.stringify(newGroups));
  setGroups(newGroups);
};

export const handleTodoInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setTodoValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setTodoValue(e.target.value);
};
export const handleTodos = (
  todoValue: string,
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>,
  setTodoValue: React.Dispatch<React.SetStateAction<string>>,
  groupName: string
) => {
  if (todoValue.trim() !== "") {
    const newTodo = {
      id: uuidv4(),
      content: todoValue.trim(),
    };

    const newGroups = Array.from(groups);
    const groupIndex = newGroups.findIndex(
      (group) => group.groupName === groupName
    );

    if (groupIndex !== -1) {
      newGroups[groupIndex].items.push(newTodo);
      setGroups(newGroups);
      localStorage.setItem("groups", JSON.stringify(newGroups));
    }
  }
};
export const handleTodosKeyDown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  todoValue: string,
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>,
  setTodoValue: React.Dispatch<React.SetStateAction<string>>,
  groupName: string
) => {
  if (e.key === "Enter") {
    handleTodos(todoValue, groups, setGroups, setTodoValue, groupName);
    setTodoValue("");
  }
};
