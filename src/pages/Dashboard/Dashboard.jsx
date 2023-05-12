import { Paper, Typography } from "@mui/material";
import CheckCat from "components/CheckCat/CheckCat";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/slices/authSlice";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogin());
  }, [dispatch]);

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: " linear-gradient(45deg, #fead06, #c00def)",
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: "2rem",
          color: "white",
          fontWeight: 700,
        }}
      >
        Hi {user.name}! Welcome back!
      </Typography>
      <CheckCat />
    </Paper>
  );
}
