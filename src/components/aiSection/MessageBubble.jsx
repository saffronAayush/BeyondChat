import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useAppStore } from "../../store";
import { AutoAwesomeRounded as AiIcon, RateReview } from "@mui/icons-material";
import { beyondBlue } from "../../constants/constants";

//sample data ****
const profile = "https://randomuser.me/api/portraits/men/95.jpg";

const MessageBubble = ({ isOwnMessage, text, buttonDisabled }) => {
  // constants and variables *******************************************
  const { setTextComposer, toggelAddToComposer } = useAppStore();

  // HTML *************************************************************
  return (
    <Stack
      direction={"row"}
      spacing={1.5}
      alignItems="flex-start"
      my={1}
      mb={1.5}
    >
      {/* Left area of messege bubble (Avatar Areat) */}
      {isOwnMessage ? (
        <Avatar alt="User" src={profile} sx={{ width: 28, height: 28 }} />
      ) : (
        <AiIcon
          sx={{
            color: beyondBlue,
          }}
        />
      )}

      {/* Right area (Main area) */}
      <Box
        elevation={0}
        sx={{
          pb: "4px",
          bgcolor: "transparent",
          textAlign: "start",
        }}
      >
        {/* Top info about person or ai */}
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            textAlign: "start",
          }}
        >
          {isOwnMessage ? "You" : "Jarvis"}
        </Typography>

        {/* Actual text data of the message bubble */}
        <Typography
          sx={{
            borderRadius: "20px",
            color: isOwnMessage ? `rgb(87, 90, 98)` : "rgb(63, 63, 63)",
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
            ...(!isOwnMessage && {
              p: 2,
              backgroundImage: `linear-gradient(135deg, #fccefb, #a6baf5)`,
            }),
          }}
        >
          {text}

          {/* Additional button for composer */}
          {!isOwnMessage && (
            <Button
              onClick={() => {
                setTextComposer(text);
                // toggelAddToComposer(); // this will flip a bool, which in mobile view, i will use to close the mini window of ai using useEffect
              }}
              disabled={buttonDisabled}
              sx={{
                bgcolor: "#f0ebfc",
                color: "black",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                fontSize: "12px",
                width: "100%",
                p: "6px 0",
                borderRadius: "12px",
                mt: "12px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                ":hover": {
                  bgcolor: "rgb(223, 218, 235)",
                },
              }}
            >
              <RateReview />
              Add to Composer
            </Button>
          )}
        </Typography>
      </Box>
    </Stack>
  );
};

export default MessageBubble;
