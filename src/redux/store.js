import authReducer from "./slices/authSlice.js";
import expenditureReducer from "./slices/expenditureSlice.js";
import taskReducer from "./slices/taskSlice.js";
import peopleMemoReducer from "./slices/peopleMemoSlice.js";
import dashboardReducer from "./slices/dashboardSlice.js";

const configureStore = require("@reduxjs/toolkit").configureStore;

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenditure: expenditureReducer,
    peopleMemo: peopleMemoReducer,
    task: taskReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
