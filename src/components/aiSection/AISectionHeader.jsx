import { AutoAwesomeRounded as AiIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { beyondBlue, beyondPurple } from "../../constants/constants";

const AISectionHeader = ({ buttonSelected, setButtonSelected }) => {
  // constants and variables ***********************************************************
  const styleForButton = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    display: "flex",
    gap: "4px",
    alignItems: "center",
    fontSize: "16px",
    p: "0px 12px",
    pt: "18px",
    pb: "12px",
    cursor: "pointer",
    ":hover": {
      borderBottom: "2px solid ",
    },
  };

  // HTML ******************************************************************************
  return (
    <>
      <Box sx={{ display: "flex", gap: "8px", pb: "3px" }}>
        <Typography
          variant="h6"
          onClick={() => setButtonSelected("Ai")}
          sx={{
            ...styleForButton,
            color: buttonSelected === "Ai" ? beyondBlue : "black",
            borderBottom: buttonSelected === "Ai" && "2px solid ",
          }}
        >
          <AiIcon
            sx={{
              fontSize: "18px",
              color: buttonSelected === "Ai" ? beyondPurple : "black",
            }}
          />
          Ai Copilet
        </Typography>
        <Typography
          variant="h6"
          onClick={() => setButtonSelected("Details")}
          sx={{
            ...styleForButton,
            color: buttonSelected === "Details" ? beyondBlue : "black",
            borderBottom: buttonSelected === "Details" && "2px solid ",
          }}
        >
          Details
        </Typography>
      </Box>
    </>
  );
};

export default AISectionHeader;
