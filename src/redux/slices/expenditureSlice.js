import axios from "axios";
import { setLogout } from "./authSlice";
import { EXPENDITURES_API } from "utils/apiEndpoint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getAllExpenditures = createAsyncThunk(
  "expenditure/getAllExpenditures",
  async (url,{ rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(EXPENDITURES_API, axiosConfig)
      .then((response) => response.data.expenditures)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const createExpenditure = createAsyncThunk(
  "expenditure/createExpenditure",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .post(EXPENDITURES_API, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const updateExpenditure = createAsyncThunk(
  "expenditure/updateExpenditure",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .put(`${EXPENDITURES_API}/${values._id}`, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const deleteExpenditure = createAsyncThunk(
  "expenditure/deleteExpenditure",
  async (targetId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .delete(`${EXPENDITURES_API}/${targetId}`, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

const expenditureSlice = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    setOrderByPriceVal: (state, action) => {
      let orderedList;
      if (action.payload === "dsc") {
        orderedList = state.list.sort(
          (itemA, itemB) => itemB.price - itemA.price
        );
      } else {
        orderedList = state.list.sort(
          (itemA, itemB) => itemA.price - itemB.price
        );
      }
      state.list = orderedList;
    },
  },
  extraReducers(builder) {
    builder
      //handle get all items
      .addCase(getAllExpenditures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenditures.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllExpenditures.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle create item
      .addCase(createExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpenditure.fulfilled, (state, action) => {
        state.list = [action.payload.expenditure, ...state.list];
        state.isLoading = false;
      })
      .addCase(createExpenditure.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle update item
      .addCase(updateExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpenditure.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedItem = action.payload;
        let newList = state.list.map((item) => {
          if (item._id === updatedItem._id) item = updatedItem;
          return item;
        });
        state.list = newList;
        state.isLoading = false;
      })
      .addCase(updateExpenditure.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle delete item
      .addCase(deleteExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpenditure.fulfilled, (state, action) => {
        const deletedId = action.payload._id;
        state.list = state.list.filter((item) => item._id !== deletedId);
        state.isLoading = false;
      })
      .addCase(deleteExpenditure.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //when logout remove data
      .addCase(setLogout, (state) => {
        state.list = [];
      });
  },
});

export const { setOrderByPriceVal } = expenditureSlice.actions;
export default expenditureSlice.reducer;
