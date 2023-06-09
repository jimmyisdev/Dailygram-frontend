import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  selectSymbol,
} from "redux/slices/cryptoSlice";

export default function SymbolInput() {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(false);
  const { allSymbolList, connected } = useSelector((state) => state.crypto);

  function handleSymbolOption(symbol) {
    setSearch(symbol);
    dispatch(selectSymbol(symbol));
    dispatch(connectSocket());
    setDisplay(false);
  }

  function handleClickOutside(event) {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  }
  function handleConnectBtn() {
    let ifExist = allSymbolList.findIndex(
      (item) => item.symbol === search.toUpperCase()
    );
    if (ifExist > -1) {
      dispatch(selectSymbol(search));
      dispatch(disconnectSocket());
      dispatch(connectSocket());
    }
  }
  function handleDisconnectBtn() {
    setSearch("");
    setOptions([]);
    dispatch(selectSymbol(""));
    dispatch(disconnectSocket());
  }
  useEffect(() => {
    if (search.length >= 3) {
      let currentSearch = search.toUpperCase();
      let currentAutoSymbols = [];
      currentAutoSymbols = allSymbolList.filter(
        ({ symbol }) => symbol.indexOf(currentSearch) > -1
      );
      setOptions(currentAutoSymbols);
    }
    return setDisplay(false);
  }, [search, allSymbolList]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (allSymbolList.length === 0) {
    return <div>is loading</div>;
  } else
    return (
      <Stack alignItems="center" ref={wrapperRef}>
        <Box justifyContent="center">
          <TextField
            id="currentSymbol"
            placeholder="Trading Symbol"
            onChange={(event) => setSearch(event.target.value)}
            onClick={() => setDisplay(!display)}
            disabled={connected}
            value={search}
            sx={{
              width: "400px",
            }}
          />
          <Stack direction="row">
            <Button disabled={connected} onClick={handleConnectBtn}>
              Connect
            </Button>
            <Button disabled={!connected} onClick={handleDisconnectBtn}>
              Disconnect
            </Button>
          </Stack>
        </Box>
        {display && !connected && (
          <Stack
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              padding: "5px",
              width: "420px",
              maxHeight: "500px",
              overflow: "scroll",
            }}
            direction="row"
            flexWrap="wrap"
          >
            {!options.length && <span>No matched item</span>}
            {!!options.length &&
              options.map((val, i) => {
                return (
                  <Stack
                    onClick={() => handleSymbolOption(val.symbol)}
                    className="option"
                    key={i + val}
                    sx={{
                      width: "135px",
                      cursor: "pointer",
                      textAlign: "center",
                      "&:hover": {
                        fontWeight: "700",
                        color: "blue",
                      },
                    }}
                  >
                    <span>{val.symbol}</span>
                  </Stack>
                );
              })}
          </Stack>
        )}
      </Stack>
    );
}
