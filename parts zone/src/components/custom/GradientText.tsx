import { SxProps, Typography } from "@mui/material";

interface props {
  text: string;
  sx?: SxProps;
}

const GradientText = ({ text, sx }) => {
  return (
    <Typography
      sx={{
        textAlign: "center",
        fontSize: { md: "40px", xs: "16.364px" },
        fontStyle: "normal",
        fontWeight: "900",
        lineHeight: "normal",
        background:
          "linear-gradient(-180deg, rgba(21,89,50,1) 0%, rgba(0,166,204,1) 100%)",
        color: "transparent",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default GradientText;
