import React, { ChangeEvent } from "react";
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
  groupValue.trim() !== "" && setGroups([...groups, groupValue]);
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
