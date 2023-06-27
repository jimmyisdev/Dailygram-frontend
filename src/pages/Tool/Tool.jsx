import { Paper } from "@mui/material";
import CryptoWatcher from "components/CryptoWatcher/CryptoWatcher";
import PageHead from "components/PageHead/PageHead";
import TextFormatter from "components/TextFormatter/TextFormatter";

export default function Tool() {
  return (
    <Paper
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: " linear-gradient(45deg, #fead06, #c00def)",
      }}
    >
      <PageHead pageTitle="Tool" />
      <TextFormatter />
      <CryptoWatcher />
    </Paper>
  );
}
