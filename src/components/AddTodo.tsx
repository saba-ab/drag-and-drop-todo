import { TextField, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  handleGroupInputChange,
  handleGroups,
  handleGroupsKeyDown,
} from "../utils/tools";
import { Groups } from "../utils/tools";
const AddTodo = () => {
  const [groupValue, setGroupValue] = useState<string>("");
  const [groups, setGroups] = useState<Groups>([]);
  const [groupNames, setGroupNames] = useState<string[]>([]);

  useEffect(() => {
    const groups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(groups);
  }, [groups]);
  useEffect(() => {
    const groupNames = groups.map((group) => group.groupName);
    setGroupNames(groupNames);
  }, [groupNames, groups]);
  return (
    <>
      <Box className="flex gap-12 border-2 border-sky-400 w-96 p-2 rounded-lg mt-10 place-items-top justify-between">
        <TextField
          value={groupValue}
          label="Add Group"
          id="standard-size-small"
          size="medium"
          variant="standard"
          onKeyDown={(e) =>
            handleGroupsKeyDown(
              e,
              groupValue,
              groups,
              setGroups,
              setGroupValue,
              groupNames
            )
          }
          onChange={(e) => handleGroupInputChange(e, setGroupValue)}
          sx={{
            input: { color: "#29cce5" },
            label: { color: "#29cce5" },
            textUnderlineOffset: "0",
            width: "80%",
          }}
        />
        <Button
          variant="outlined"
          onClick={() =>
            handleGroups(groupValue, groups, setGroups, setGroupValue)
          }
        >
          Create
        </Button>
      </Box>
    </>
  );
};

export default AddTodo;
