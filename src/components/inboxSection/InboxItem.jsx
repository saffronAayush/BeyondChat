import { Avatar, Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { beyondBlue, beyondPurple, lightText } from "../../constants/constants";
import { useAppStore } from "../../store";
import { formatChatTimestamp } from "../../utils/utitlity";
import MotionBox from "../MotionBox";

const InboxItem = ({ data }) => {
  // constants and variable ******************************************************
  const { setShowInboxSection } = useAppStore();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    amount: 0.3,
  });
  const {
    _id,
    profile,
    name,
    lastMessageText,
    lastMessage,
    time,
    unreadMessageCount,
  } = data;
  const timeToDisplay = formatChatTimestamp(time);

  //functions ***********************************************************************
  const handleClick = () => {
    setShowInboxSection(false); // will only affect when the screen width is smaller, and the inbox section is hovering over the chat
    navigate(`/chat/${_id}`);
  };

  // HTML *****************************************************************************
  return (
    <MotionBox ref={ref} isInView={isInView}>
      <Box
        onClick={() => handleClick()}
        sx={{
          minHeight: "80px",
          display: "flex",
          bgcolor: "white",
          borderRadius: "15px",
          alignItems: "center",
          pl: "0",
          cursor: "pointer",
          m: "6px 4px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: chatId !== _id && "#f3e8ff", // light lavender
            borderLeft: "3px solid #c084fc", // subtle accent
          },
          ...(chatId === _id && {
            backgroundColor: "#d8b4fe", // active state lavender
            borderLeft: "3px solid #c084fc", // subtle accent
          }),
        }}
      >
        {/* Left Avatar Side ****** */}
        <Box
          flex={0.4}
          sx={{
            pl: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: "45px",
              height: "45px",
            }}
            src={profile}
          />
        </Box>

        {/* Right Main Content Side ***** */}
        <Box
          flex={2.4}
          sx={{
            p: "3px",
            pl: "6px",
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "4px",
          }}
        >
          {/* Uper area of card *** */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {/* Name of Friend *** */}
            <Typography
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                wordBreak: "break-all",
                maxWidth: "100%",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
            >
              {name}
            </Typography>

            {/* Time of last message *** */}
            <Typography
              component="span"
              sx={{
                pl: "5px",
                whiteSpace: "nowrap",
                color: lightText,
                fontSize: "10px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                display: chatId === _id && "none",
              }}
            >
              {timeToDisplay}
            </Typography>
          </Box>

          {/* Lower area of card  *** (For Persons Other than the one chating with) */}
          {chatId !== _id && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                // bgcolor: "white",
                pr: "6px",
              }}
            >
              {/* Last message preview *** */}
              <Typography
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  wordBreak: "break-all",
                  maxWidth: "100%",
                  color: lightText,
                  fontFamily: "Roboto sans-serif",
                }}
              >
                {lastMessageText ? lastMessage : "Sent an Attachment"}
              </Typography>

              {/* Unread message Count *** */}
              <Typography
                component="span"
                sx={{
                  p: "0 5px",
                  whiteSpace: "nowrap",
                  borderRadius: "100%",
                  display: unreadMessageCount > 0 ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "25px",
                  minWidth: "16px",
                  fontSize: "10px",
                  ml: "3px",
                  backgroundImage: `linear-gradient(135deg,${beyondBlue},${beyondPurple})`,
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                }}
              >
                {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </MotionBox>
  );
};

export default InboxItem;
