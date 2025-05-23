import { Box, Typography } from "@mui/material";
import { AutoAwesomeRounded as AiIcon } from "@mui/icons-material";
import { beyondBlue } from "../../constants/constants";

const AboutCopilet = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <AiIcon
        sx={{
          fontSize: "30px",
          color: beyondBlue,
        }}
      />
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Hi, I'm Jarvis Ai Copilot
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          color: "#737475",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Ask me anything about this conversation.
      </Typography>
    </Box>
  );
};

export default AboutCopilet;
