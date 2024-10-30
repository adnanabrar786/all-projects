"use client";
import PromptAccordion from "@/components/common/PromptSaveAccordion";
// import PromptAccordion from "@/components/common/PromptAccordion";
import { Box } from "@mui/material";

const SavePrompt = () => {
  return (
    <Box sx={{ position: "relative", paddingTop: "1.56rem" }}>
      {/* <Box
        sx={{
          backgroundColor:'var(--backgroundsidebar)',
          height: "90px",
          paddingLeft: "25px",
          boxShadow: "var(--boxshadowcolor)",
          display: { lg: "flex", xs: "none" }, //To appear on large screen only
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography sx={{ color: "var(--textWhite)", fontWeight: 600 }}>
          My Profile
        </Typography>
        <ToggleDarkMode bgcolor="var(--backgroundwhite)" />
      </Box> */}
      <Box
        sx={{
          // backgroundColor: "var(--lightblack)",
          // padding: "1.563rem 0.938rem",
          // borderRadius: "0.8rem",
          backgroundColor: "var(--lavender)",
          padding: "1.6rem 0.9rem",
          borderRadius: "0.8rem",
          mx: "0.7rem",
        }}
      >
        <PromptAccordion />
      </Box>
    </Box>
  );
};

export default SavePrompt;
