import { Box, Button } from "@mui/material";
import { useState } from "react";
import InboxHeader from "../components/inboxSection/InboxHeader";
import InboxItem from "../components/inboxSection/InboxItem";
import { inboxHideWidth } from "../constants/constants";
import { chatItems } from "../constants/sampleChatItemData";
import { groupChatItems } from "../constants/sampleGroupItems";
import { useAppStore } from "../store";

const InboxSection = () => {
  // usestatee *******************************************************
  const [buttonActive, setButtonActive] = useState("Direct");
  const [chatItemsToShow, setChatItemsToShow] = useState(chatItems);

  // constants and variables ****************************************
  const { showInboxSection } = useAppStore();
  const buttons = ["Direct", "Group"];

  // functions *******************************************************
  const changeInbox = (button) => {
    setButtonActive(button);
    if (button === buttonActive) return;
    if (button === "Direct") setChatItemsToShow(chatItems);
    else setChatItemsToShow(groupChatItems);
  };

  // HTML ***********************************************************
  return (
    <Box
      flex={1.5}
      sx={{
        backgroundColor: "#f9fbfc",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
        overflow: "hidden",
        [`@media (max-width:${inboxHideWidth})`]: {
          position: "absolute",
          transition: "0.3s",
          left: showInboxSection ? "0px" : "-400px",
          zIndex: "1000",
          boxShadow: "5px 0 10px -2px rgba(0, 0, 0, 0.3)",
          height: "100%",
        },
      }}
    >
      {/* Header **** */}
      <InboxHeader />

      {/* Buttons for  direct or group chat index switch */}
      <Box
        sx={{
          display: "flex",
          pl: "10px",
          gap: "8px",
          zIndex: "2",
          mb: "4px",
        }}
      >
        {buttons.map((button) => (
          <Button
            key={button}
            sx={{
              textTransform: "none",
              borderRadius: "14px",
              fontSize: "13px",
              p: "4px 10px",
              color: "black",
              fontFamily: "Poppins, sans-serif",
              backgroundImage:
                buttonActive === button &&
                "linear-gradient(135deg,rgba(118, 82, 235, 0.70),rgba(182, 73, 255, 0.30))",
              color: buttonActive === button ? "white" : "#acacac",
            }}
            onClick={() => changeInbox(button)}
          >
            {button}{" "}
          </Button>
        ))}
      </Box>

      {/* Chat List **** */}
      <Box
        sx={{
          overflow: "auto",
          pb: "20px",
          zIndex: 20,
          boxShadow: `inset 0px -8px 10px -6px rgba(0, 0, 0, 0.15)`,

          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            width: 0, // Chrome/Safari
          },
          "&:hover": {
            scrollbarWidth: "thin", // Firefox
          },
          "&:hover::-webkit-scrollbar": {
            width: "8px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {chatItemsToShow.map((item) => (
          <InboxItem key={item._id} data={item} />
        ))}
      </Box>
    </Box>
  );
};

export default InboxSection;
