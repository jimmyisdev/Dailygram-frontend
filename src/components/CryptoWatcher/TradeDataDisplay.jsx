import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
export default function TradeDataDisplay({ data }) {
  const {
    currentPrice = 0,
    currentQty = 0,
    currentTradeTime,
    currentTradeSymbol = "",
  } = data;
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: "900",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CurrencyExchangeIcon
          sx={{
            margin: "5px",
          }}
        />
        {currentTradeSymbol} - Last Trade Record
      </Typography>
      <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", padding: "5px" }}>
        <Stack direction="row">
          <Stack
            sx={{
              width: "150px",
            }}
          >
            <Typography variant="h5">Trade Time</Typography>
          </Stack>
          <Stack
            sx={{
              width: "150px",
            }}
          >
            <Typography variant="h5">Last Price</Typography>
          </Stack>
          <Stack
            sx={{
              width: "150px",
            }}
          >
            <Typography variant="h5">Last Quantity</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row">
          <Stack
            direction="row"
            sx={{
              width: "150px",
            }}
          >
            <Typography variant="span">{currentTradeTime}</Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: currentPrice > lastPrice ? "#2C440D" : "#A50321",
                fontWidth: "800",
              }}
              variant="span"
            >
              {currentPrice}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "150px",
            }}
          >
            <Typography
              sx={{
                color: currentQty > lastQty ? "#2C440D" : "#A50321",
                fontWidth: "800",
              }}
              variant="span"
            >
              {currentQty}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
