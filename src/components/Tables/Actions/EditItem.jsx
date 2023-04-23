import { Button, Modal, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "pages/Task/TaskForm";
import ExpenditureForm from "pages/Expenditure/ExpenditureForm";
import PeopleMemoForm from "pages/PeopleMemo/PeopleMemoForm";
import PopupDialog from "components/Dialog/PopupDialog";

export default function EditItem({ dataType, item }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => setIsEditModalOpen(true);
  const handleEditModalClose = () => setIsEditModalOpen(false);
  return (
    <>
      <Button onClick={handleEditModalOpen}>
        <EditIcon
          sx={{
            color: "black",
          }}
        />
      </Button>
      <PopupDialog handleClose={handleEditModalClose} status={isEditModalOpen}>
        {dataType === "task" && <TaskForm actionType="update" data={item} />}
        {dataType === "expenditure" && (
          <ExpenditureForm actionType="update" data={item} />
        )}
        {dataType === "people_memo" && (
          <PeopleMemoForm actionType="update" data={item} />
        )}
      </PopupDialog>
    </>
  );
}
