import axios from "axios";
import { setLogout } from "./authSlice";
import { PEOPLEMEMO_API } from "utils/apiEndpoint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getAllPeopleMemos = createAsyncThunk(
  "peopleMemo/getAllPeopleMemos",
  async ({ rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(PEOPLEMEMO_API, axiosConfig)
      .then((response) => response.data.peopleMemos)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const createPeopleMemo = createAsyncThunk(
  "peopleMemo/createPeopleMemo",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .post(PEOPLEMEMO_API, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const updatePeopleMemo = createAsyncThunk(
  "peopleMemo/updatePeopleMemo",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .put(`${PEOPLEMEMO_API}/${values._id}`, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const deletePeopleMemo = createAsyncThunk(
  "peopleMemo/deletePeopleMemo",
  async (targetId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .delete(`${PEOPLEMEMO_API}/${targetId}`, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

const peopleMemoSlice = createSlice({
  name: "peopleMemo",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllPeopleMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPeopleMemos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPeopleMemos.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle create item
      .addCase(createPeopleMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPeopleMemo.fulfilled, (state, action) => {
        state.list = [action.payload.peopleMemo, ...state.list];
        state.isLoading = false;
      })
      .addCase(createPeopleMemo.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle update item
      .addCase(updatePeopleMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePeopleMemo.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        let newList = state.list.map((item) => {
          if (item._id === updatedItem._id) item = updatedItem;
          return item;
        });
        state.list = newList;
        state.isLoading = false;
      })
      .addCase(updatePeopleMemo.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle delete item
      .addCase(deletePeopleMemo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePeopleMemo.fulfilled, (state, action) => {
        const deletedId = action.payload._id;
        state.list = state.list.filter((item) => item._id !== deletedId);
        state.isLoading = false;
      })
      .addCase(deletePeopleMemo.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //when logout remove data
      .addCase(setLogout, (state) => {
        state.list = [];
      });
  },
});

export default peopleMemoSlice.reducer;
