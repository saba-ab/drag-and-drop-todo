import React, { ChangeEvent, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";

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
  groupValue.trim() !== "" &&
    localStorage.setItem(
      "groups",
      JSON.stringify([...groups, groupValue.trim()])
    );
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

export const handleDragEnd = (
  result: DropResult,
  groupItems: {
    [key: string]: Array<{ id: string; content: string }>;
  },
  setGroupItems: React.Dispatch<
    SetStateAction<{
      [key: string]: Array<{ id: string; content: string }>;
    }>
  >
) => {
  const { source, destination } = result;

  if (!destination) return;

  if (source.droppableId === destination.droppableId) {
    // Reordering in the same group
    const items = Array.from(groupItems[source.droppableId]);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setGroupItems({
      ...groupItems,
      [source.droppableId]: items,
    });
  } else {
    // Moving between groups
    const sourceItems = Array.from(groupItems[source.droppableId]);
    const destItems = Array.from(groupItems[destination.droppableId]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, movedItem);

    setGroupItems({
      ...groupItems,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    });
  }
};
