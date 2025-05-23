import { Box, TextareaAutosize } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { beyondBlue, beyondPurple, lightText } from "../constants/constants";

const TextInputWrapper = forwardRef(
  (
    {
      inputValue,
      setInputValue,
      handleSubmit,
      placeholder = "How may I help you, today?",
      aiInputBox = true,
      iconOn = "right",
      children,
    },
    ref
  ) => {
    //useState ***************************************************************************
    const [isInFocus, setIsInFocus] = useState(false);

    // useEffect *************************************************************************
    useEffect(() => {
      // This is to bring the input box in the viewport when in mobile a virtual keyboard shows up
      const scrollToInput = () => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

      const handleViewportResize = () => {
        if (document.activeElement === ref.current) {
          scrollToInput();
        }
      };

      window.visualViewport?.addEventListener("resize", handleViewportResize);

      return () => {
        window.visualViewport?.removeEventListener(
          "resize",
          handleViewportResize
        );
      };
    }, []);

    // HTML ************************************************************************************
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: aiInputBox && "20px",
          pb: iconOn === "bottom" && "50px",
          transition: "all 0.3s",
          boxShadow:
            isInFocus && aiInputBox
              ? `-5px -1px 20px 0px ${beyondBlue}, 5px 1px 20px 0px ${beyondPurple}`
              : `0px 0px 20px -5px ${lightText}`,

          ":hover": {
            boxShadow:
              !isInFocus && aiInputBox
                ? `-5px -1px  20px -20px ${beyondBlue}, 5px 1px 20px -5px ${beyondPurple}`
                : undefined,
          },
        }}
      >
        <TextareaAutosize
          ref={ref}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setIsInFocus(true);
          }}
          onBlur={() => setIsInFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          minRows={1}
          maxRows={6}
          placeholder={placeholder}
          style={{
            width: "100%",
            resize: "none",
            border: "none",
            outline: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            backgroundColor: "transparent",
            padding: "16px 16px",
            paddingRight: iconOn === "right" ? "40px" : "16px",
            paddingBottom: iconOn === "right" ? "16px" : "0px",
          }}
        />

        {children}
      </Box>
    );
  }
);

export default TextInputWrapper;
