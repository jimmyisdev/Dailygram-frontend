import { Paper } from "@mui/material";
import PageHead from "components/PageHead/PageHead";
import TextFormatter from "components/TextFormatter/TextFormatter";

export default function Tool() {
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: " linear-gradient(45deg, #fead06, #c00def)",
      }}
    >
      <PageHead pageTitle="Tool" />
      <TextFormatter />
    </Paper>
  );
}
