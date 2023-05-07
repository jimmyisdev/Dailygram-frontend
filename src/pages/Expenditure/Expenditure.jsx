import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import ItemTable from "components/Tables/ItemTable";

import ExpenditureForm from "./ExpenditureForm";
import { getAllExpenditures } from "redux/slices/expenditureSlice";
import {
  EXPENDITURE_HEADS,
  EXPENDITURE_ROW,
} from "components/Tables/rowFields";
import PopupDialog from "components/Dialog/PopupDialog";
import PageHead from "components/PageHead/PageHead";
import OrderByVal from "components/Filters/OrderByVal";

export default function Expenditure() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, isLoading, error } = useSelector((state) => state.expenditure);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);

  useEffect(() => {
    Boolean(token) && dispatch(getAllExpenditures(""));
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
      <PageHead pageTitle="Expenditure" addFunc={handleAddModalOpen} />
      <PopupDialog handleClose={handleAddModalClose} status={isAddModalOpen}>
        <ExpenditureForm actionType="create" />
      </PopupDialog>
      {!isLoading && (
        <Typography
          gutterBottom
          sx={{
            marginTop: "1rem",
          }}
        >
          {list.length > 0
            ? `You have ${list.length} expenditures.`
            : "You do not have an expenditure."}
        </Typography>
      )}
      <Box>
        {isLoading && <LinearProgress />}
        {!isLoading && list.length > 0 && <OrderByVal />}
        {!isLoading && list.length > 0 && (
          <ItemTable
            dataType="expenditure"
            tableData={list}
            tableOrder={EXPENDITURE_ROW}
            tableHead={EXPENDITURE_HEADS}
          />
        )}
        {!isLoading && error && (
          <Typography
            sx={{
              padding: "1rem",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
