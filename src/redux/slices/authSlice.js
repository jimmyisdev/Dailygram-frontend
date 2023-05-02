import axios from "axios";
import { axiosConfigHeaders } from "utils/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_API } from "utils/apiEndpoint";

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
      state.isLoading = true;
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo?.token) {
        const { email, name, role, token } = userInfo;
        state.user = { email: email, name: name, role: role };
        state.token = token;
        state.isLoading= false
      }
    },
    setLogout: (state) => {
      state.isLoading = true;
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.isLoading= false
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
    .post(`${AUTH_API}/login`, values, axiosConfigHeaders)
    .then((response) => response.data);
});

export const signupUser = createAsyncThunk("auth/signupUser", (values) => {
  return axios
    .post(`${AUTH_API}/signup`, values, axiosConfigHeaders)
    .then((response) => response.data);
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
