import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";

import ItemRow from "./ItemRow";

export default function ItemTable({
  dataType,
  tableData,
  tableOrder,
  tableHead,
}) {
  return (
    <TableContainer
      sx={{ maxHeight: "400px", overflow: "auto" }}
      component={Paper}
    >
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={dataType + item} align="center">
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Typography>
              </TableCell>
            ))}
            <TableCell align="center">
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!tableData.length &&
            tableData.map((item) => (
              <ItemRow
                key={item._id}
                dataType={dataType}
                itemData={item}
                tableOrder={tableOrder}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
