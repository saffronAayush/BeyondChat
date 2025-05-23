import { Avatar, Typography, useMediaQuery } from "@mui/material";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  aiSectionHideWidth,
  beyondBlue,
  beyondPurple,
} from "../../constants/constants";
import { useAppStore } from "../../store/index.js";
import MotionBox from "../MotionBox";

const MessageItem = ({
  text,
  isFirstInGroup,
  isLastInGroup,
  isOwnMessage,
  profile,
  openChat, // for opening the mini Ai box
}) => {
  // useStates *********************************************************************
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [showAskButton, setShowAskButton] = useState(false);

  //constants and Variables *******************************************************
  const { setTextForAiInput, setShrinkAiSection } = useAppStore();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    amount: 0.3,
  });
  const isMobile = useMediaQuery(`(max-width:${aiSectionHideWidth})`);

  //functions **************************************************************************
  const getBorderRadius = () => {
    if (isOwnMessage) {
      if (isFirstInGroup && isLastInGroup) return "25px";
      if (isFirstInGroup) return "25px 25px 2px 25px";
      if (isLastInGroup) return "25px 2px 25px 25px";
      return "25px 2px 2px 25px";
    } else {
      if (isFirstInGroup && isLastInGroup) return "25px";
      if (isFirstInGroup) return "25px 25px 25px 2px";
      if (isLastInGroup) return "2px 25px 25px 25px";
      return "2px 25px 25px 2px";
    }
  };

  const handleClick = () => {
    if (isMobile) openChat(); // For small ai box
    setShrinkAiSection(false); // if the ai sections was not visible, make it in the viewport
    setTextForAiInput(text);
  };

  // HTML *******************************************************************************
  return (
    <MotionBox
      ref={ref}
      isInView={isInView}
      style={{
        backgroundColor: !isOwnMessage && "#e7eff7",
        maxWidth: "60%",
        display: "flex",
        gap: "4px",
        padding: "10px 22px",
        borderRadius: getBorderRadius(),
        alignSelf: isOwnMessage ? "flex-end" : "flex-start",
        margin: "2px 0",
        marginBottom: isLastInGroup ? "10px" : "2px",
        backgroundImage: isOwnMessage
          ? `linear-gradient(135deg, ${beyondBlue}, ${beyondPurple})`
          : "none",
        color: isOwnMessage ? "white" : "black",
        position: "relative",
        left: !isOwnMessage && "33px",
        cursor: "default",
      }}
    >
      {/* Attaching avatar the partners to their last message*/}
      {!isOwnMessage && isLastInGroup && (
        <Avatar
          sx={{
            position: "absolute",
            width: "28px",
            height: "28px",
            left: "-33px",
            bottom: "5px",
          }}
          src={profile}
        />
      )}

      <Typography
        variant="body1"
        onMouseEnter={(e) => {
          setHoverPos({ x: e.clientX, y: e.clientY });
          setShowAskButton(true);
        }}
        onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowAskButton(false)}
        onClick={handleClick}
        fontSize="14px"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: 1.5,
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            color: isOwnMessage ? "black" : "rgb(81, 85, 194)",
          },
        }}
      >
        {text}

        {/* info shows on hovering over the message text */}
        {showAskButton && (
          <Typography
            variant="contained"
            size="small"
            sx={{
              position: "fixed",
              top: hoverPos.y + 10,
              left: hoverPos.x + 10,
              zIndex: 9999,
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "16px",
              backgroundColor: "#5b5fc7",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              color: "white",
              pointerEvents: "none", // make it hover-transparent
            }}
          >
            Ask AI
          </Typography>
        )}
      </Typography>
    </MotionBox>
  );
};

export default MessageItem;
