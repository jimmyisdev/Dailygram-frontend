import { LinearProgress } from "@mui/material";
import Navbar from "components/Navbar/Navbar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default Layout;
