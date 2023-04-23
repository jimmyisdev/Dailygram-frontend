import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import PopupDialog from "components/Dialog/PopupDialog";
import { useState } from "react";

export default function DetailsItem({ item }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const handleDetailsModalOpen = () => setIsDetailsModalOpen(true);
  const handleEditModalClose = () => setIsDetailsModalOpen(false);
  let processedDate = new Date(item.createdAt).toDateString();

  return (
    <>
      <Button onClick={handleDetailsModalOpen}>
        <MoreHorizIcon
          sx={{
            color: "black",
          }}
        />
      </Button>
      <PopupDialog
        handleClose={handleEditModalClose}
        status={isDetailsModalOpen}
      >
        <Stack direction="column">
          <DialogTitle>
            <Typography
              align="center"
              sx={{
                fontWeight: 600,
              }}
            >
              {item.name}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>{item.description}</Typography>
            <Typography>Created at {processedDate}</Typography>
          </DialogContent>
        </Stack>
      </PopupDialog>
    </>
  );
}
