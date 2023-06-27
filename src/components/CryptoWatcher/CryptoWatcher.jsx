import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSymbols,
  marketDepthSocket,
  tradeSocket,
} from "redux/slices/cryptoSlice";
import SymbolInput from "./SymbolInput";
import TradeDataDisplay from "./TradeDataDisplay";
import OrderBookDisplay from "./OrderBookDisplay";

export default function CryptoWatcher() {
  const dispatch = useDispatch();
  const [openTool, setOpenTool] = useState(false);
  const [tradeData, setTradeData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const { currentSymbol, connected } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(getAllSymbols());
  }, [dispatch]);

  useEffect(() => {
    setTradeData(null);
    setMarketData(null);
  }, [currentSymbol]);

  useEffect(() => {
    if (connected) {
      tradeSocket.on("message", (event) => {
        let data = JSON.parse(event.data);
        let tradeTime = data.T;
        tradeTime = new Date(tradeTime).toLocaleTimeString();
        let tradePrice = data.p;
        let tradeQuantity = data.q;
        let tradeSymbol = data.s;
        let singleTradeInfo = {
          currentPrice: tradePrice,
          currentQty: tradeQuantity,
          currentTradeTime: tradeTime,
          currentTradeSymbol: tradeSymbol,
        };
        setTradeData(singleTradeInfo);
      });
      marketDepthSocket.on("message", (event) => {
        let data = JSON.parse(event.data);
        setMarketData(data);
      });
    }
  }, [connected, currentSymbol]);

  return (
    <Stack>
      <Button onClick={() => setOpenTool(!openTool)}>
        <Typography>Crypto Watcher</Typography>
      </Button>
      {openTool && (
        <Stack>
          <SymbolInput />
          {tradeData != null && <TradeDataDisplay data={tradeData} />}
          {marketData != null && <OrderBookDisplay data={marketData} />}
        </Stack>
      )}
    </Stack>
  );
}
