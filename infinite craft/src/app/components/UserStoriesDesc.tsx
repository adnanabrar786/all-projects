"use client";

import InvertedQuotes from "@/assets/icons/invertedquotes.svg";
import { poppins } from "@/components/ThemeRegistry/theme";
import { Box, Typography } from "@mui/material";

const UserStoriesDesc = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          justifyContent: { lg: "flex-start", md: "flex-start", xs: "center" },
        }}
      >
        <InvertedQuotes />
      </Box>
      <Typography
        sx={{
          marginTop: "2.19rem",
          color: "var(--lightGrey)",
          fontSize: { lg: "1.25rem", md: "1.25rem", sm: "0.875rem" },
          fontFamily: poppins.style.fontFamily,
          lineHeight: "1.5",
        }}
      >
        "Infinite Craft has been a game-changer for me. I no longer spend hours{" "}
        <br></br>
        crafting the perfect prompt. The tool does it all!" - Alexa R.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { lg: "flex-start", md: "flex-start", xs: "center" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.75rem",
            fontWeight: "600",
            marginTop: "3rem",
            fontFamily: poppins.style.fontFamily,
          }}
        >
          Alexa R.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { lg: "flex-start", md: "flex-start", xs: "center" },
        }}
      >
        <Typography
          sx={{ fontSize: "1rem", fontFamily: poppins.style.fontFamily }}
        >
          Sales & Marketing
        </Typography>
      </Box>
    </>
  );
};

export default UserStoriesDesc;
