import {
  CallRounded as CallIcon,
  MenuRounded as HamburgerIcon,
  ArrowCircleRightRounded as KeyboardDoubleArrowRightIcon,
  VideocamRounded as VideoCamIcon,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  aiSectionHideWidth,
  inboxHideWidth,
  lightgray,
} from "../../constants/constants";
import { useAppStore } from "../../store";

const ChattingAreaHeader = ({ name, profile }) => {
  //Constants and Varaibles ******************************************************
  const { setShrinkAiSection, shrinkAiSection, setShowInboxSection } =
    useAppStore();

  // functions ********************************************************************
  const expendRight = () => {
    setShrinkAiSection(!shrinkAiSection);
  };

  // HTML ************************************************************************
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side with partner info and (Hamburger icon whenever neccessary) */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "Open Sans",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontWeight: "bold",
            fontFamily: "Open Sans",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
          }}
        >
          <Tooltip
            title="Open Chats"
            sx={{
              [`@media (min-width:${inboxHideWidth})`]: {
                display: "none",
              },
            }}
          >
            <IconButton onClick={() => setShowInboxSection(true)}>
              <HamburgerIcon
                sx={{
                  color: lightgray,
                }}
              />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
            }}
            src={profile}
          />
          {name}
        </Typography>

        {/* Right side with IconButtons */}
        <Box>
          <Tooltip title="Voice Call">
            <IconButton>
              <CallIcon
                sx={{
                  color: lightgray,
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Video Call">
            <IconButton>
              <VideoCamIcon
                sx={{
                  color: lightgray,
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={shrinkAiSection ? "Shrink Left" : "Expend Right"}
            sx={{
              [`@media (max-width:${aiSectionHideWidth})`]: {
                display: "none",
              },
            }}
          >
            <IconButton onClick={() => expendRight()}>
              <KeyboardDoubleArrowRightIcon
                sx={{
                  color: lightgray,
                  transition: "transform 0.4s",
                  transform: shrinkAiSection
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default ChattingAreaHeader;
