import { TableRow, TableCell } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import EditItem from "./Actions/EditItem";
import DeleteItem from "./Actions/DeleteItem";
import DetailsItem from "./Actions/DetailsItem";

export default function ItemRow({ dataType, itemData, tableOrder }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {tableOrder.map((item) => {
        if (item === "level") {
          const clr = () => {
            switch (itemData[item]) {
              case "normal":
                return "blue";
              case "emergent":
                return "red";
              case "unnecessary":
                return "gray";
              default:
                return "black";
            }
          };
          return (
            <TableCell
              key={itemData.id + item}
              align="center"
              sx={{ color: clr() }}
            >
              {itemData[item].toUpperCase()}
            </TableCell>
          );
        }
        if (item === "isCompleted") {
          return (
            <TableCell key={itemData.id + item} align="center">
              {itemData[item] ? (
                <DoneIcon color="success" />
              ) : (
                <ClearIcon color="error" />
              )}
            </TableCell>
          );
        }
        return (
          <TableCell key={itemData.id + item} align="center">
            {itemData[item]}
          </TableCell>
        );
      })}
      <TableCell align="center">
        <EditItem dataType={dataType} item={itemData} />
        <DeleteItem dataType={dataType} item={itemData._id} />
        <DetailsItem item={itemData} />
      </TableCell>
    </TableRow>
  );
}
