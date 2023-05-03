import { useEffect } from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/global.css";
import PrivateRoutes from "pages/PrivateRoutes/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenditure from "./pages/Expenditure/Expenditure";
import Task from "./pages/Task/Task";
import PeopleMemo from "./pages/PeopleMemo/PeopleMemo";
import NotFound from "./pages/NotFound/NotFound";
import AuthPage from "pages/AuthPage/AuthPage";
import { setLogin } from "redux/slices/authSlice";
import Layout from "pages/Layout/Layout";

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
          {isAuth ? (
            <Route element={<Layout />}>
              <Route index path="/" element={<Dashboard />} exact />
              <Route path="/expenditure" element={<Expenditure />} />
              <Route path="/task" element={<Task />} />
              <Route path="/peopleMemo" element={<PeopleMemo />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          ) : (
            <>
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/signup" element={<AuthPage type="signup" />} />
              <Route path="*" element={<AuthPage type="login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
