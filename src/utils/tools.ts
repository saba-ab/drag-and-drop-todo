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
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>,
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
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>,
  setGroupValue: React.Dispatch<React.SetStateAction<string>>,
  groupNames: string[]
) => {
  if (e.key === "Enter") {
    if (groupNames.length >= 10 && e.key === "Enter") {
      alert("You can only have 10 groups");
      setGroupValue("");
      return;
    }
    if (groupNames.includes(groupValue.trim()) && e.key === "Enter") {
      alert("Group name already exists");
      setGroupValue("");
      return;
    }
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

export type Groups = Group[];

export const handleDragEnd = (
  result: DropResult,
  groups: Groups,
  setGroups: Dispatch<SetStateAction<Groups>>
): void => {
  const { source, destination, type } = result;
  if (!destination) return;
  let newGroups = Array.from(groups);

  if (type === "DEFAULT") {
    const [reorderedGroup] = newGroups.splice(source.index, 1);
    newGroups.splice(destination.index, 0, reorderedGroup);
  } else {
    const sourceGroupIndex = newGroups.findIndex(
      (group) => group.groupName === source.droppableId
    );
    const destinationGroupIndex = newGroups.findIndex(
      (group) => group.groupName === destination.droppableId
    );

    if (sourceGroupIndex === -1 || destinationGroupIndex === -1) return;

    if (source.droppableId === destination.droppableId) {
      const sourceItems = Array.from(newGroups[sourceGroupIndex].items);
      const [reorderedItem] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, reorderedItem);
      newGroups[sourceGroupIndex].items = sourceItems;
    } else {
      const sourceItems = Array.from(newGroups[sourceGroupIndex].items);
      const destItems = Array.from(newGroups[destinationGroupIndex].items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      newGroups[sourceGroupIndex].items = sourceItems;
      newGroups[destinationGroupIndex].items = destItems;
    }
  }

  setGroups(newGroups);
  localStorage.setItem("groups", JSON.stringify(newGroups));
  console.log(result);
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
export const handleCopyTodo = (
  todoId: string,
  groupName: string,
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>
) => {
  const newGroups = groups.map((group) => {
    if (group.groupName === groupName && group.items) {
      const index = group.items.findIndex((item) => item.id === todoId);
      if (index !== -1) {
        const newTodo = {
          id: uuidv4(),
          content: group.items[index].content,
        };

        const newItems = [...group.items];
        newItems.splice(index + 1, 0, newTodo);

        return {
          ...group,
          items: newItems,
        };
      }
    }
    return group;
  });

  setGroups(newGroups);
  localStorage.setItem("groups", JSON.stringify(newGroups));
};
export const handleDeleteTodo = (
  todoId: string,
  groupName: string,
  groups: Groups,
  setGroups: React.Dispatch<React.SetStateAction<Groups>>
) => {
  const newGroups = groups.map((group) => {
    if (group.groupName === groupName && group.items) {
      return {
        ...group,
        items: group.items.filter((item) => item.id !== todoId),
      };
    }
    return group;
  });

  setGroups(newGroups);
  localStorage.setItem("groups", JSON.stringify(newGroups));
};
