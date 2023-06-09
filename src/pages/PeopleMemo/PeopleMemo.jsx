import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, LinearProgress, Stack } from "@mui/material";
import ItemTable from "components/Tables/ItemTable";

import PeopleMemoForm from "./PeopleMemoForm";
import { getAllPeopleMemos } from "redux/slices/peopleMemoSlice";
import {
  PEOPLE_MEMO_HEADS,
  PEOPLE_MEMO_ROW,
} from "components/Tables/rowFields";
import PopupDialog from "components/Dialog/PopupDialog";
import PageHead from "components/PageHead/PageHead";
import AddNewItem from "components/AddNewItem/AddNewItem";

export default function PeopleMemo() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, isLoading, error } = useSelector((state) => state.peopleMemo);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);

  useEffect(() => {
    Boolean(token) && dispatch(getAllPeopleMemos(""));
  }, [token, dispatch]);

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
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <>
          <Stack direction="row">
            <PageHead pageTitle="People Memo" />
            <AddNewItem addFunc={handleAddModalOpen} />
          </Stack>
          <PopupDialog
            handleClose={handleAddModalClose}
            status={isAddModalOpen}
          >
            <PeopleMemoForm actionType="create" />
          </PopupDialog>
          {!error && (
            <Typography
              gutterBottom
              sx={{
                marginTop: "1rem",
              }}
            >
              {list.length > 0
                ? `You have ${list.length} memo.`
                : "You do not have a memo."}
            </Typography>
          )}
          <Box>
            {list.length > 0 && (
              <ItemTable
                dataType="people_memo"
                tableData={list}
                tableOrder={PEOPLE_MEMO_ROW}
                tableHead={PEOPLE_MEMO_HEADS}
              />
            )}
            {error && (
              <Typography
                sx={{
                  padding: "1rem",
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
}
