"use client";

import { openSans } from "@/components/ThemeRegistry/theme";
import { Typography } from "@mui/material";

const FeatureDesc = () => {
  return (
    <Typography
      sx={{
        color: "#D7D7D7",
        marginTop: { lg: "2.5rem", xs: "2rem" },
        marginBottom: { lg: "0", sm: "6.7rem", xs: "3rem" },
        lineHeight: "1.875rem",
        fontFamily: openSans.style.fontFamily,
        fontSize: "1.25rem",
        textTransform: "capitalize",
      }}
    >
      Simply input your query or prompt. Infinite Craft fine-tunes your prompt,
      ensuring superior ChatGPT responses.
    </Typography>
  );
};

export default FeatureDesc;
