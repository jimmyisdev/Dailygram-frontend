import { Button, Typography, Tooltip, Box, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PageHead({ pageTitle, addFunc }) {
  return (
    <Box direction="row">
      <Stack direction="row">
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
        <Tooltip title="Add new expenditure" placement="right" arrow>
          <Button onClick={addFunc}>
            <AddIcon
              sx={{
                color: "black",
              }}
            />
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}
