import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { inboxHideWidth } from "../../constants/constants";
import { useAppStore } from "../../store";

const InboxHeader = () => {
  // constants and variables ***************************************************
  const { setShowInboxSection } = useAppStore();

  // HTML **********************************************************************
  return (
    <Box p={2} sx={{}}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Your Inbox
        <IconButton
          onClick={() => setShowInboxSection(false)}
          sx={{
            display: "flex",
            [`@media (min-width:${inboxHideWidth})`]: {
              display: "none",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Typography>

      <Divider />
    </Box>
  );
};

export default InboxHeader;
