import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCat.pending, (state) => {
        state.isLoading = true;
        state.list = [];
      })
      .addCase(getCat.fulfilled, (state, action) => {
        const catItem = action.payload;
        state.isLoading = false;
        state.list = catItem;
      })
      .addCase(getCat.rejected, (state, action) => {
        console.log(action);
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const getCat = createAsyncThunk(
  "dashboard/getCat",
  async (values, { rejectWithValue }) => {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search`)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.payload.message);
      });
  }
);

export default dashboardSlice.reducer;
