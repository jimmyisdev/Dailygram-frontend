import { Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound({ type }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [type, navigate]);

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
      <Typography>404</Typography>
      <Typography>Sorry, this page does not exist</Typography>
    </Paper>
  );
}
