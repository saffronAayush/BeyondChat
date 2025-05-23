import {
  AutoAwesomeRounded as AiIcon,
  ArrowUpwardRounded,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AIMessageItem from "../components/aiSection/AIMessageItem";
import AISectionHeader from "../components/aiSection/AISectionHeader";
import TextInputWrapper from "../components/TextInputWrapper";
import {
  aiSectionHideWidth,
  beyondBlue,
  beyondPurple,
} from "../constants/constants";
import { aiResponse } from "../constants/sampleAiResponse";
import { useAppStore } from "../store";
import AboutCopilet from "../components/aiSection/AboutCopilet";

const AISection = () => {
  //useStates *****************************************************************
  const [loadInChunk, setLoadInChunk] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loadingReply, setLoadingReply] = useState(false);
  const [buttonSelected, setButtonSelected] = useState("Ai");

  // constants and variables *************************************************
  const {
    textForAiInput,
    focusTriggerForAiInput,
    aiConversation,
    setAiConversation,
    shrinkAiSection,
  } = useAppStore();
  const { chatId } = useParams();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Functions ***************************************************************
  const handleSubmit = () => {
    if (loadingReply || inputValue.trim().length <= 0) return;
    setLoadingReply(true);

    const messageData = {
      isOwnMessage: true,
      text: inputValue,
    };
    setAiConversation(messageData, chatId);

    // simulating ai response within 900 ms ****
    setTimeout(() => {
      const ind = Math.floor(Math.random() * 4); // getting random number between 0 and 3
      const response = aiResponse[ind]; //taking random sample data of aiResponse

      setLoadInChunk(true);
      setAiConversation(response, chatId);
    }, 900);

    setInputValue("");
    return;
  };

  useEffect(() => {
    setInputValue(textForAiInput); // This is for, when i click on any message in the chatting area, it copies to the ai input box
    if (textForAiInput.length) inputRef?.current?.focus();
  }, [focusTriggerForAiInput]); // focusTrigger another variable for the same task, as if i click on the same message again it won't regist as new and doest trigger the useEffect, so i took another variable

  //  HTML ***********************************************************************
  return (
    <Box
      flex={shrinkAiSection ? 0 : 2}
      sx={{
        borderLeft: "1px solid #ddd",
        transition: "flex 0.4s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle,rgba(220, 215, 253, 0.74) 0%,rgba(249, 239, 249, 0.69) 70%)",
      }}
    >
      {/* Ai section Header **** */}
      <Box
        p={1}
        sx={{
          zIndex: "200",
          boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.1)", // bottom-only outer shadow
          pt: 0,
          pb: 0,
          bgcolor: "white",
          [`@media (max-width:${aiSectionHideWidth})`]: {
            display: "none",
          },
        }}
      >
        <AISectionHeader
          buttonSelected={buttonSelected}
          setButtonSelected={setButtonSelected}
        />
      </Box>

      {/* Ai section main area, show  details only, if the "Details" button is selected in the header else otherwise */}
      {buttonSelected === "Details" ? (
        <AboutCopilet />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            pb: 1.5,

            justifyContent: "space-between",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Chat area of ai **** */}
          {aiConversation.length <= 0 && <AboutCopilet />}

          <Box
            sx={{
              overflow: "auto",
              p: 1,
            }}
          >
            {aiConversation.map((data, i) => {
              return (
                <AIMessageItem
                  key={i}
                  setLoadingReply={setLoadingReply}
                  isOwnMessage={data.isOwnMessage}
                  text={data.text}
                  loadInChunk={loadInChunk}
                  setLoadInChunk={setLoadInChunk}
                  scrollRef={scrollRef}
                />
              );
            })}
            <div ref={scrollRef} />
          </Box>

          {/* Input area for the ai Chat *** */}
          <TextInputWrapper
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            ref={inputRef}
          >
            <IconButton
              onClick={handleSubmit}
              disabled={loadingReply}
              sx={{
                position: "absolute",
                right: 8,
                bottom: 4,
                color: beyondBlue,
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.2)",
                  color: beyondPurple,
                },
              }}
            >
              <ArrowUpwardRounded />
            </IconButton>
          </TextInputWrapper>
        </Box>
      )}
    </Box>
  );
};

export default AISection;
