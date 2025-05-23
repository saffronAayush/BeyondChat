import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Button,
  Fade,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { inboxHideWidth } from "../constants/constants";
import { useAppStore } from "../store";

const BlankChattingSection = () => {
  // constants and variables **************************************************************
  const theme = useTheme();
  const isMobile = useMediaQuery(`(max-width:${inboxHideWidth})`);
  const { setShowInboxSection } = useAppStore();

  // HTML **************************************************************************************
  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "linear-gradient(to bottom right, #ede9fe, #faf5ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Fade in>
        <Box sx={{ textAlign: "center" }}>
          {/* Floating Icon */}
          <ChatBubbleOutlineIcon
            sx={{
              fontSize: isMobile ? 60 : 80,
              color: theme.palette.primary.main,
              animation: "float 3s ease-in-out infinite",
            }}
          />

          {/* Title */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            mt={2}
            fontWeight={600}
            color="primary"
          >
            No Conversation Selected
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            color="text.secondary"
            mt={1}
            mb={3}
            sx={{ maxWidth: 400, mx: "auto" }}
          >
            Select someone from the sidebar or start a new chat to get going.
            We're waiting!
          </Typography>

          {/* Classy Button */}
          {isMobile && (
            <Button
              variant="contained"
              onClick={() => setShowInboxSection(true)}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "999px",
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "#fff",
                textTransform: "none",
                boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 25px rgba(168, 85, 247, 0.6)",
                  background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Start New Chat
            </Button>
          )}
        </Box>
      </Fade>

      {/* Floating animation keyframe */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BlankChattingSection;
