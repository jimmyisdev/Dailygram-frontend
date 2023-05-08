import axios from "axios";
import { setLogout } from "./authSlice";
import { TASKS_API } from "utils/apiEndpoint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (url, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`${TASKS_API}${url}`, axiosConfig)
      .then((response) => response.data.tasks)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .post(TASKS_API, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (values, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .put(`${TASKS_API}/${values._id}`, values, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (targetId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .delete(`${TASKS_API}/${targetId}`, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      });
  }
);

const taskSlices = createSlice({
  name: "task",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, (state, action) => {
        state.isLoading = true;
        state.list = [];
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle create item
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.list = [action.payload.task, ...state.list];
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle update item
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        let newList = state.list.map((item) => {
          if (item._id === updatedItem._id) item = updatedItem;
          return item;
        });
        state.list = newList;
        state.isLoading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //handle delete item
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedId = action.payload._id;
        state.list = state.list.filter((item) => item._id !== deletedId);
        state.isLoading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //when logout remove data
      .addCase(setLogout, (state) => {
        state.list = [];
      });
  },
});

export default taskSlices.reducer;
