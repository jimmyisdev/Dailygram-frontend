import { Button, Tooltip } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddNewItem({ addFunc }) {
  return (
    <Tooltip title="Add new expenditure" placement="right" arrow>
      <Button onClick={addFunc}>
        <AddIcon
          sx={{
            color: "black",
          }}
        />
      </Button>
    </Tooltip>
  );
}
