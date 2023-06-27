import authReducer from "./slices/authSlice.js";
import expenditureReducer from "./slices/expenditureSlice.js";
import taskReducer from "./slices/taskSlice.js";
import peopleMemoReducer from "./slices/peopleMemoSlice.js";
import cryotoReducer from "./slices/cryptoSlice.js";
import dashboardReducer from "./slices/dashboardSlice.js";
import { socketMiddleware } from "./middleware/socket.js";
import { Socket } from "utils/Socket.js";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenditure: expenditureReducer,
    peopleMemo: peopleMemoReducer,
    task: taskReducer,
    dashboard: dashboardReducer,
    crypto: cryotoReducer,
  },
  middleware: [socketMiddleware(new Socket()), ...getDefaultMiddleware()],
});

export default store;
