"use client";

import GradientText from "@/components/custom/GradientText";
import { Typography } from "@mui/material";

interface Props {
  title: string;
  name: string;
  desc: string;
}

const StoriesDesc = ({ title, name, desc }: Props) => {
  return (
    <>
      <GradientText
        sx={{
          textAlign: { sm: "left", xs: "center" },
          marginLeft: "17px",
          marginTop: { xs: "25px", md: "0px" },
          fontSize: "28px",
        }}
        text={title}
      />
      <Typography
        sx={{
          color: "#000",
          fontSize: "26px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
          width: { md: "320px", sm: "400px", xs: "90%" },
          marginTop: { md: "0px", xs: "10px" },
          marginLeft: { md: "0xp", xs: "20px" },
          marginRight: { md: "0xp", xs: "20px" },
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          marginTop: { md: "1rem", xs: "24px" },
          color: "#000",
          fontSize: "14px",
          lineHeight: "1.5",
          width: { md: "480px", sm: "466px", xs: "90%" },
          marginLeft: { md: "0xp", xs: "20px" },
          marginRight: { md: "0xp", xs: "20px" },
        }}
      >
        {desc}
      </Typography>
    </>
  );
};

export default StoriesDesc;
