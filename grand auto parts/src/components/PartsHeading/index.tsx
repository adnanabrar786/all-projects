import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Underline from "../Underline";

interface Props {
  heading: string;
}

export default function PartsHeading({ heading }: Props) {
  return (
    <>
      <Box
        sx={{
          padding: "0.5rem 0 0 0",
          marginTop: { md: "20px", xs: "20px" },
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          {heading}
        </Typography>

        <Underline sx={{ marginTop: "10px" }} />
      </Box>
    </>
  );
}
