import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOrderByPriceVal } from "redux/slices/expenditureSlice";
export default function OrderByVal({}) {
  const [orderByVal, setOrderByVal] = useState("");
  const dispatch = useDispatch();
  function handleSwitchChange(event) {
    dispatch(setOrderByPriceVal(event.target.value));
    setOrderByVal(event.target.value);
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="price-order">Assign order</InputLabel>
        <Select
          labelId="price-order"
          id="price-order"
          label="Price Order"
          onChange={handleSwitchChange}
          value={orderByVal}
        >
          <MenuItem value="dsc">High to low</MenuItem>
          <MenuItem value="asc">Low to high</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
