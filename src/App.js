import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenditure from "./pages/Expenditure/Expenditure";
import Task from "./pages/Task/Task";
import PeopleMemo from "./pages/PeopleMemo/PeopleMemo";
import NotFound from "./pages/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import AuthPage from "pages/AuthPage/AuthPage";
import { useEffect } from "react";
import { setLogin } from "redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  // const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isAuth = true;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLogin());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuth) navigate(-2);
  // }, [isAuth]);

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      {isAuth && <Navbar />}
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/expenditure"
            element={isAuth ? <Expenditure /> : <Navigate to="/login" />}
          />
          <Route
            path="/task"
            element={isAuth ? <Task /> : <Navigate to="/login" />}
          />
          <Route
            path="/peopleMemo"
            element={isAuth ? <PeopleMemo /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/login"
            element={!isAuth ? <AuthPage type="login" /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuth ? <AuthPage type="signup" /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
