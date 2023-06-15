import { Paper, Typography, Stack, Button, DialogTitle } from "@mui/material";
import AuthForm from "components/AuthForm/AuthForm";
import PopupDialog from "components/Dialog/PopupDialog";
import { useState } from "react";

export default function AuthPage({ type }) {
  const logoList = ["android", "ios"];
  const [infoShow, setInfoShow] = useState(false);
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
      <Stack
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Stack direction="row" spacing={2}>
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
        </Stack>
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
      <Stack direction="row" spacing={2}>
        {logoList.map((item) => {
          return (
            <Button key={item} onClick={() => setInfoShow(true)}>
              <img
                src={process.env.PUBLIC_URL + `/assets/${item}.png`}
                alt={`${item} icon`}
                width="100"
              />
            </Button>
          );
        })}
      </Stack>
      <PopupDialog handleClose={() => setInfoShow(false)} status={infoShow}>
        <Stack direction="column">
          <DialogTitle>
            <Typography
              align="center"
              sx={{
                fontWeight: 600,
              }}
            >
              Hire Jimmy to finance the development of new feature
            </Typography>
          </DialogTitle>
        </Stack>
      </PopupDialog>
    </Paper>
  );
}
