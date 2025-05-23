import { Box, Button, Stack, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

//Sample data ********
const suggestions = [
  "Getting a refund",
  "Refund for an order placed by mistake",
  "Refund for an unwanted gift",
];
const AIMessageItem = ({
  text,
  isOwnMessage,
  setLoadingReply,
  scrollRef,
  loadInChunk,
  setLoadInChunk,
}) => {
  //useState **********************************************************
  const [displayedText, setDisplayedText] = useState(" ");
  const [addToComposerButtoneDisabled, setAddToComposerButtoneDisabled] =
    useState(true);

  // constants and variable *******************************************
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    amount: 0.1,
  });

  // useEffects ******************************************************
  useEffect(() => {
    if (!isOwnMessage && loadInChunk) {
      // simulating ai response provided in chunks, appear like live writing....
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setLoadingReply(false);
          setAddToComposerButtoneDisabled(false);
        }
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 25);
      return () => {
        clearInterval(interval);
      };
    } else {
      {
        setAddToComposerButtoneDisabled(false);
        setDisplayedText(text);

        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [text, isOwnMessage]);

  useEffect(() => {
    setLoadInChunk(false);
  }, []);

  // HTML **************************************************************
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        style={{
          marginBottom: "4px",
          textAlign: "start",
        }}
      >
        <MessageBubble
          isOwnMessage={isOwnMessage}
          text={displayedText}
          buttonDisabled={addToComposerButtoneDisabled}
        />

        {/* ai response details and potential queries suggetion */}
        {!isOwnMessage && (
          <Box ml={6} mt={-1} mb={2}>
            <Typography
              fontWeight={500}
              color="rgba(84, 84, 84, 0.61)"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
              }}
            >
              15 relevant sources found
            </Typography>

            <Stack spacing={1} mt={1.3} mb={1}>
              {suggestions.map((suggestion, i) => (
                <Typography
                  key={i}
                  sx={{
                    justifyContent: "flex-start",
                    pl: 0,
                    cursor: "pointer",
                    color: "rgb(49, 55, 61)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    ":hover": {
                      color: "black",
                    },
                  }}
                  onClick={() => alert(`Clicked on: ${suggestion}`)}
                >
                  {"●"} {suggestion}
                </Typography>
              ))}

              <Button
                variant="text"
                sx={{
                  pl: 0,
                  color: "primary.main",
                  borderRadius: "20px",
                  width: "fit",
                }}
              >
                See all →
              </Button>
            </Stack>
          </Box>
        )}
      </motion.div>
    </>
  );
};

export default AIMessageItem;
