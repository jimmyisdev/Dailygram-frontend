import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

export default function PopupDialog({ children, handleClose, status }) {
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={status}>
      <DialogContent dividers>
        <Button onClick={handleClose}>
          <CloseIcon
            sx={{
              color: "black",
            }}
          />
        </Button>
        {children}
      </DialogContent>
    </Dialog>
  );
}
