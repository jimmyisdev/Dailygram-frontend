import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteTask } from "redux/slices/taskSlice";
import { deleteExpenditure } from "redux/slices/expenditureSlice";
import { deletePeopleMemo } from "redux/slices/peopleMemoSlice";

export default function DeleteItem({ dataType, item }) {
  const dispatch = useDispatch();
  function handleDeleteBtn(type, item) {
    switch (type) {
      case "task":
        return dispatch(deleteTask(item));
      case "expenditure":
        return dispatch(deleteExpenditure(item));
      case "people_memo":
        return dispatch(deletePeopleMemo(item));
      default:
        return;
    }
  }
  return (
    <Button onClick={() => handleDeleteBtn(dataType, item)}>
      <DeleteIcon
        sx={{
          color: "black",
        }}
      />
    </Button>
  );
}
