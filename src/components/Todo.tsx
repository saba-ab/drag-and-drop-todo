import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { GroupItems } from "../types/MainDataTypes";
import { pink } from "@mui/material/colors";
interface TodoProps {
  text: string;
  id: string;
  groupName: string;
  onDeleteTodo: (id: string, groupName: string) => void;
  onCopy: (id: string, groupName: string) => void;
}
const Todo = ({ text, id, groupName, onDeleteTodo, onCopy }: TodoProps) => {
  const [groups, setGroups] = useState<GroupItems>([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, [groups]);

  return (
    <div className="flex justify-between gap-3">
      <div className="check-text flex items-center gap-3">
        <Checkbox
          size="small"
          checked={isChecked}
          onChange={handleCheckboxChange}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
        <p style={{ textDecoration: isChecked ? "line-through" : "none" }}>
          {text}
        </p>
      </div>
      <div className="copy-delete flex gap-3">
        <Button
          onClick={() => onCopy(id, groupName)}
          variant="contained"
          color="success"
          size="small"
        >
          Copy
        </Button>
        <Button
          onClick={() => onDeleteTodo(id, groupName)}
          variant="outlined"
          color="error"
          size="small"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Todo;
