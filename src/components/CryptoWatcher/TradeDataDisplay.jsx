import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function TradeDataDisplay({ data }) {
  const { currentPrice = 0, currentQty = 0, currentTradeTime } = data;
  const [lastVale, setLastVal] = useState({
    lastQty: "",
    lastPrice: "",
  });
  const { lastQty, lastPrice } = lastVale;
  useEffect(() => {
    setLastVal({
      lastPrice: currentPrice,
      lastQty: currentQty,
    });
  }, [currentPrice, currentQty]);

  return (
    <Stack>
      <Stack direction="row">
        <Stack
          sx={{
            width: "150px",
          }}
        >
          <Typography variant="h5">Price</Typography>
        </Stack>
        <Stack
          sx={{
            width: "150px",
          }}
        >
          <Typography variant="h5">Quantity</Typography>
        </Stack>
        <Stack
          sx={{
            width: "150px",
          }}
        >
          <Typography variant="h5">Trade Time</Typography>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Stack
          direction="row"
          sx={{
            width: "150px",
          }}
        >
          {currentPrice > lastPrice ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          <Typography>{currentPrice}</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: "150px",
          }}
        >
          {currentQty > lastQty ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          <Typography>{currentQty}</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: "150px",
          }}
        >
          <Typography>{currentTradeTime}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
