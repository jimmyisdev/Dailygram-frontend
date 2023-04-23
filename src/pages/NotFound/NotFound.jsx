import { Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
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
      <Link to="/">Go Back</Link>
    </Paper>
  );
}
