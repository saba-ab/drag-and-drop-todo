import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { handleTodosKeyDown } from "../utils/tools";

interface TodoInputProps {
  groups: any[];
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  groupName: string;
}

const TodoInput = ({ groups, setGroups, groupName }: TodoInputProps) => {
  const [todoValue, setTodoValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleTodosKeyDown(
      e,
      todoValue,
      groups,
      setGroups,
      setTodoValue,
      groupName
    );
  };
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, [groups]);

  return (
    <>
      <TextField
        className="todo-input bg-teal-200 rounded-lg w-full absolute bottom-0"
        label="Todo"
        id="outlined-size-small"
        size="small"
        value={todoValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default TodoInput;
