import { useEffect, lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/global.css";
import PrivateRoutes from "pages/PrivateRoutes/PrivateRoutes";
import AuthPage from "pages/AuthPage/AuthPage";
import { setLogin } from "redux/slices/authSlice";
import Layout from "pages/Layout/Layout";

const Task = lazy(() => import("./pages/Task/Task"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Expenditure = lazy(() => import("./pages/Expenditure/Expenditure"));
const PeopleMemo = lazy(() => import("./pages/PeopleMemo/PeopleMemo"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    dispatch(setLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<PrivateRoutes />}>
              <Route index path="/" element={<Dashboard />} exact />
              <Route path="/expenditure" element={<Expenditure />} />
              <Route path="/task" element={<Task />} />
              <Route path="/peopleMemo" element={<PeopleMemo />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Route>
          <Route
            path="/login"
            element={
              isAuth ? <Navigate replace to={"/"} /> : <AuthPage type="login" />
            }
          />
          <Route
            path="/signup"
            element={
              isAuth ? (
                <Navigate replace to={"/"} />
              ) : (
                <AuthPage type="signup" />
              )
            }
          />
          <Route
            path="*"
            element={
              isAuth ? <Navigate replace to={"/"} /> : <AuthPage type="login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
