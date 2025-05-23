import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import AISection from "../sections/AISection";
import InboxSection from "../sections/InboxSection";
import { aiSectionHideWidth } from "../constants/constants";

const Home = () => {
  const MountAiSection = useMediaQuery(`(min-width:${aiSectionHideWidth})`);
  const { chatId } = useParams();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100dvh",
          transition: "all 2s",
        }}
      >
        <InboxSection />
        <Outlet />

        {MountAiSection && chatId && <AISection />}
      </Box>
    </>
  );
};

export default Home;
