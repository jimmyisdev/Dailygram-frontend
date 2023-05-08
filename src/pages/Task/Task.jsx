import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import ItemTable from "components/Tables/ItemTable";

import TaskForm from "./TaskForm";
import { getAllTasks } from "redux/slices/taskSlice";
import { TASK_HEADS, TASK_ROW } from "components/Tables/rowFields";
import PopupDialog from "components/Dialog/PopupDialog";
import PageHead from "components/PageHead/PageHead";
import TaskFilter from "./TaskFilter";

export default function Task() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, isLoading, error } = useSelector((state) => state.task);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);
  useEffect(() => {
    Boolean(token) && dispatch(getAllTasks(""));
  }, [dispatch, token]);

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: " linear-gradient(45deg, #fead06, #c00def)",
      }}
    >
      <PageHead pageTitle="Task" addFunc={handleAddModalOpen} />
      <PopupDialog handleClose={handleAddModalClose} status={isAddModalOpen}>
        <TaskForm actionType="create" />
      </PopupDialog>
      <TaskFilter />
      {!isLoading && !error && (
        <Typography
          gutterBottom
          sx={{
            marginTop: "1rem",
          }}
        >
          {list?.length > 0
            ? `You have ${list?.length} tasks.`
            : "You do not have a task."}
        </Typography>
      )}
      <Box>
        {isLoading && <LinearProgress />}
        {!isLoading && list?.length > 0 && (
          <ItemTable
            dataType="task"
            tableData={list}
            tableOrder={TASK_ROW}
            tableHead={TASK_HEADS}
          />
        )}
        {!isLoading && error && <Typography>{error}</Typography>}
      </Box>
    </Paper>
  );
}
