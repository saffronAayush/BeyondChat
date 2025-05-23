import { AttachFile, EmojiEmotions } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChattingAreaHeader from "../components/chatSection/ChattingAreaHeader";
import MessageItem from "../components/chatSection/MessageItem";
import ChatWidget from "../components/ChatWidget";
import TextInputWrapper from "../components/TextInputWrapper";
import { aiSectionHideWidth } from "../constants/constants";
import { chatItems } from "../constants/sampleChatItemData";
import { messages } from "../constants/sampleMessages";
import { useAppStore } from "../store";
import { formateDateLabel } from "../utils/utitlity";

// sample Data ************************************
const currentUserId = "u1";

// Main Component Starts here *****************************************************************************************
const ChattingSection = () => {
  // useState *********************************************************************************
  const [messagesShow, setMessagesShow] = useState(messages);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for mini Ai box
  const [isChatClosed, setIsChatClosed] = useState(true); // for mini Ai box
  const [chatPartnerProfile, setChatPartnerProfile] = useState({
    name: "Default",
    profile: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  // constants and variables **********************************************************
  const { textForComposer, focusTrigger, addToComposer } = useAppStore();
  const isMobile = useMediaQuery(`(max-width:${aiSectionHideWidth})`);
  const { chatId } = useParams();
  const messagesShowEndRef = useRef(null);
  const inputRef = useRef(null);

  //functions *************************************************************************
  const openChat = () => {
    //for mini ai box
    setIsOpen(true);
    setIsChatClosed(false);
  };

  const closeChat = () => {
    //for mini ai box
    setIsChatClosed(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 10);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        _id: Date.now().toString(),
        senderId: currentUserId,
        text: input,
        createdAt: new Date(),
      };
      setMessagesShow((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  // Get the message possiton in group of messages: top, middle or bottom
  const getMessageGroupPosition = (messages, index) => {
    const current = messages[index];
    const previous = messages[index - 1];
    const next = messages[index + 1];

    const isSameDay = (a, b) => {
      return new Date(a).toDateString() === new Date(b).toDateString();
    };

    const isFirstInGroup =
      !previous ||
      previous.senderId !== current.senderId ||
      !isSameDay(previous.createdAt, current.createdAt);

    const isLastInGroup =
      !next ||
      next.senderId !== current.senderId ||
      !isSameDay(next.createdAt, current.createdAt);

    return { isFirstInGroup, isLastInGroup };
  };

  const dayDivision = (msg, index) => {
    const currentDate = new Date(msg.createdAt);
    const prevDate =
      index > 0 ? new Date(messagesShow[index - 1].createdAt) : null;

    return !prevDate || currentDate.toDateString() !== prevDate.toDateString();
  };

  //useEffects ************************************************************************
  // Simulating socket message arrival
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessagesShow((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          senderId: "u2",
          text: "Hello from socket!",
          createdAt: new Date(),
        },
      ]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // chat partner details
  useEffect(() => {
    const user = chatItems.find((user) => user._id === chatId);
    if (user) setChatPartnerProfile(user);
  }, [chatId]);

  // geting the message from the ai section from teh addToComposeer button
  useEffect(() => {
    setInput(textForComposer);
    if (textForComposer.length) inputRef.current.focus();
    closeChat(); // for the small ai box
  }, [focusTrigger]); // used when the add to composer is click in the ai section, that will trigger it

  // scroll down to the last message automatically
  useEffect(() => {
    const scrollToBottom = () => {
      messagesShowEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messagesShow]);

  // HTML *********************************************************************
  return (
    <>
      <Box
        flex={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Chat area Header ******* */}
        <Box
          p={2}
          sx={{
            zIndex: "200",
            boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.1)", // bottom-only outer shadow
            p: "10px",
          }}
        >
          <ChattingAreaHeader
            name={chatPartnerProfile.name}
            profile={chatPartnerProfile.profile}
          />
        </Box>

        {/* Chat Area main content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            zIndex: "19",
          }}
        >
          {/* Chating area where messages shows *** */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              p: 1,
            }}
          >
            {messagesShow.map((msg, index) => {
              const isNewDay = dayDivision(msg, index);
              const formattedDateLabel = formateDateLabel(msg);
              const { isFirstInGroup, isLastInGroup } = getMessageGroupPosition(
                messagesShow,
                index
              );

              return (
                <React.Fragment key={msg._id}>
                  {/* Divide the chat area into day segments */}
                  {isNewDay && (
                    <Box
                      sx={{
                        textAlign: "center",
                        my: 2,
                        fontSize: "12px",
                        color: "#666",
                        fontWeight: 500,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {formattedDateLabel}
                    </Box>
                  )}
                  {/* message bubbles */}
                  <MessageItem
                    text={msg.text}
                    user={chatPartnerProfile}
                    isFirstInGroup={isFirstInGroup}
                    isLastInGroup={isLastInGroup}
                    isOwnMessage={msg.senderId === currentUserId}
                    profile={chatPartnerProfile.profile}
                    openChat={openChat}
                  />
                </React.Fragment>
              );
            })}
            <div ref={messagesShowEndRef} />
          </Box>

          {/*Input Text field area for the chat *** */}
          <TextInputWrapper
            aiInputBox={false}
            iconOn="bottom"
            handleSubmit={handleSend}
            inputValue={input}
            placeholder="Click on any Message to ask Ai..."
            setInputValue={setInput}
            ref={inputRef}
          >
            <Box
              sx={{
                width: "97%",
                bgcolor: "white",
                position: "absolute",
                bottom: 0,
              }}
            >
              {/* Left Side Icons Buttons  */}
              <Box
                sx={{
                  position: "relative",
                  left: 8,
                  bottom: 6,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    color: "gray",
                    scale: "0.95",
                    transition: "0.3s",
                    "&:hover": {
                      color: "black",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <AttachFile />
                </IconButton>

                <IconButton
                  sx={{
                    color: "gray",
                    scale: "0.95",
                    transition: "0.3s",
                    "&:hover": {
                      color: "black",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <EmojiEmotions />
                </IconButton>
              </Box>

              {/* Right Side Icons Buttons  */}
              <Box
                sx={{
                  position: "absolute",
                  right: 12,
                  bottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  zIndex: 10,
                }}
              >
                {/* Send Button */}
                <IconButton
                  onClick={handleSend}
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "#e0e0e0",
                    px: 2,
                    py: 1,
                    color: "#1565c0", // Assuming "beyondBlue"
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#d1c4e9",
                      color: "#7b1fa2", // Assuming "beyondPurple"
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Send
                </IconButton>

                {/* Ai box open button in mobile Screen */}
                {isMobile && (
                  <>
                    <Box
                      sx={{
                        width: "1px",
                        height: 28,
                        backgroundColor: "#ccc",
                        mx: 0.5,
                      }}
                    />
                    <IconButton
                      sx={{
                        width: 40,
                        height: 40,
                        p: 0,
                        borderRadius: "50%",
                        backgroundColor: "#f5f5f5",
                        boxShadow: "2px 0 6px -2px rgba(0, 0, 0, 0.2)", // right-side shadow
                        transition: "0.3s",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <ChatWidget
                        isOpen={isOpen}
                        openChat={openChat}
                        closeChat={closeChat}
                        isChatClosed={isChatClosed}
                      />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          </TextInputWrapper>
        </Box>
      </Box>
    </>
  );
};

export default ChattingSection;
