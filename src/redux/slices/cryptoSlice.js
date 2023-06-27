import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Socket } from "utils/Socket";
const getSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";

export const tradeSocket = new Socket();
export const marketDepthSocket = new Socket();
const initialState = {
  isLoading: false,
  connected: false,
  allSymbolList: [],
  currentSymbol: "",
  error: "",
  tradeData: [],
};

export const getAllSymbols = createAsyncThunk(
  "crypto/getAllSymobols",
  async (_, { rejectWithValue }) => {
    return axios
      .get(getSymbolsURL)
      .then((response) => response.data.symbols)
      .catch((error) => error);
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    selectSymbol: (state, { payload }) => {
      state.currentSymbol = payload;
    },
    disconnectSocket: (state) => {
      state.connected = false;
      try {
        tradeSocket.disconnect();
        marketDepthSocket.disconnect();
      } catch (error) {
        state.error = error;
      }
    },
    connectSocket: (state) => {
      const { currentSymbol } = state;
      const levels = 20;
      try {
        const baseEndpoint = `wss://stream.binance.com:9443/ws/${currentSymbol.toLowerCase()}`;
        tradeSocket.connect(`${baseEndpoint}@aggTrade`);
        marketDepthSocket.connect(`${baseEndpoint}@depth${levels}`);
        state.connected = true;
      } catch (error) {
        console.log(error);
        state.error = error;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSymbols.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSymbols.fulfilled, (state, action) => {
        let allSymbolList = action.payload.map((item) => item.symbol);
        state.allSymbolList = allSymbolList;
        state.isLoading = false;
      })
      .addCase(getAllSymbols.rejected, (state, action) => {
        state.isLoading = false;
        state.allSymbolList = [];
      });
  },
});

export const {
  selectSymbol,
  setTradeSocket,
  disconnectSocket,
  connectSocket,
  streamSocket,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;

// https://api.exchangerate-api.com/v4/latest/TWD
