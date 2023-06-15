import { Typography } from "@mui/material";

export default function PageHead({ pageTitle }) {
  return (
    <Typography
      component="h1"
      align="center"
      sx={{
        fontSize: "2rem",
        color: "black",
        fontWeight: 700,
        padding: ".5rem",
      }}
    >
      {pageTitle}
    </Typography>
  );
}
