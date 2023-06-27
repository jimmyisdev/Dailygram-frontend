import { Button, Stack, TextField } from "@mui/material";
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
  const { allSymbolList, currentSymbol, connected } = useSelector(
    (state) => state.crypto
  );

  function handleAddSymbol(symbol) {
    dispatch(selectSymbol({ symbol }));
    setDisplay(false);
  }

  function handleClickOutside(event) {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  }
  function handleConnectBtn() {
    dispatch(disconnectSocket());
    dispatch(connectSocket());
  }
  function handleDisconnectBtn() {
    dispatch(selectSymbol({}));
    dispatch(disconnectSocket());
  }
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
      <Stack ref={wrapperRef} className="search_area">
        <TextField
          id="currentSymbol"
          label="Trading Symbol"
          onChange={(e) => dispatch(selectSymbol(e.target.value))}
        />
        <Stack direction="row">
          <Button disabled={connected} onClick={handleConnectBtn}>
            Connect
          </Button>
          <Button disabled={!connected} onClick={handleDisconnectBtn}>
            Disconnect
          </Button>
        </Stack>
        {display && (
          <div className="autoContainer">
            {!options.length && <span>No matched item</span>}
            {!!options.length &&
              options.map((val, i) => {
                return (
                  <div
                    onClick={() => handleAddSymbol(val)}
                    className="option"
                    key={i + val}
                  >
                    <span>{val}</span>
                  </div>
                );
              })}
          </div>
        )}
      </Stack>
    );
}
