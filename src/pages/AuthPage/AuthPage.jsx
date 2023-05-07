import { Paper, Typography, Stack } from "@mui/material";
import AuthForm from "components/AuthForm/AuthForm";

export default function AuthPage({ type }) {
  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, #fead06, #c00def)",
      }}
    >
      <Stack>
        <Typography
          gutterBottom
          variant="h3"
          component="h1"
          sx={{
            fontSize: "3rem",
            color: "white",
            fontWeight: 700,
            paddingRight: "1rem",
            paddingLeft: "1rem",
          }}
        >
          Dailygram
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{
            fontSize: "1.5rem",
            color: "white",
            fontWeight: 700,
            paddingRight: "1rem",
            paddingLeft: "1rem",
          }}
        >
          Manage all your daily task, expenditure & connection in ONE App
        </Typography>
      </Stack>
      <AuthForm type={type} />
    </Paper>
  );
}
