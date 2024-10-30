"use client";

import { Typography } from "@mui/material";

interface Props {
  title: string;
  name: string;
  desc: string;
}

const StoriesDesc = ({ title, name, desc }: Props) => {
  return (
    <>
      <Typography
        sx={{
          marginTop: { md: "0x", xs: "45px" },
          color: "#155932",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "800",
          lineHeight: "normal",
          marginLeft: { md: "0xp", xs: "20px" },
          marginRight: { md: "0xp", xs: "20px" },
        }}
      >
        {title}
      </Typography>
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
