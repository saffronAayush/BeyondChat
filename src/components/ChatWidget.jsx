import { AutoAwesomeRounded as AiIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { beyondBlue, beyondPurple } from "../constants/constants";
import AISection from "../sections/AISection";

const ChatWidget = ({ isOpen, openChat, closeChat, isChatClosed }) => {
  // constants and variables ***************************************************************
  const chatBoxRef = useRef(null);

  // useEffects ***************************************************************************
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target) &&
        isOpen
      ) {
        closeChat();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // HTML **********************************************************************************
  return (
    <Box sx={{ position: "absolute", bottom: 0, right: 0, zIndex: 1000 }}>
      <AnimatePresence>
        {/* Mini Ai Icon button in the input area  */}
        {isChatClosed && (
          <motion.div
            key="chatbutton"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <IconButton
              onClick={openChat}
              sx={{
                backgroundColor: "rgb(255, 255, 255)",
                color: beyondBlue,
                width: 40,
                height: 40,
                borderRadius: "20px",
                boxShadow: 4,
                "&:hover": {
                  color: beyondPurple,
                },
              }}
            >
              <AiIcon />
            </IconButton>
          </motion.div>
        )}

        {/* Actual Mini Ai box open */}
        {isOpen && (
          <motion.div
            key="chatbox"
            ref={chatBoxRef}
            initial={{
              opacity: 0,
              width: 60,
              height: 60,
              borderRadius: 20,
              y: 40,
            }}
            animate={{
              opacity: 1,
              width: 320,
              height: 500,
              borderRadius: 20,
              y: 0,
            }}
            exit={{
              opacity: 0,
              width: 0,
              height: 0,
              borderRadius: 20,
              y: 40,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            style={{
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              position: "relative",
              display: "flex",
              overflow: "hidden",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
                position: "absolute",
                top: "4px",
                right: "10px",
              }}
            >
              <IconButton onClick={closeChat} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <AISection />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ChatWidget;
