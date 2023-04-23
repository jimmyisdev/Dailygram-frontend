import axios from "axios";
import { axiosConfigHeaders } from "utils/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo?.token) {
        const { email, name, role, token } = userInfo;
        state.user = { email: email, name: name, role: role };
        state.token = token;
      }
    },
    setLogout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        const { email, name, role, token } = action.payload;
        state.user = { email: email, name: name, role: role };
        state.token = token;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.error.message;
        state.isLoading = false;
      })

      //signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        const { email, name, role, token } = action.payload;
        state.user = { email: email, name: name, role: role };
        state.token = token;
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const loginUser = createAsyncThunk("auth/loginUser", (values) => {
  return axios
    .post("https://dailygram2023-api.onrender.com/api/v1/user/login", values, axiosConfigHeaders)
    .then((response) => response.data);
});

export const signupUser = createAsyncThunk("auth/signupUser", (values) => {
  return axios
    .post("https://dailygram2023-api.onrender.com/api/v1/user/signup", values, axiosConfigHeaders)
    .then((response) => response.data);
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
