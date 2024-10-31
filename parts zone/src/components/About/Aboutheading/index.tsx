import { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  heading: string;
  sx?: SxProps;
}

export default function Aboutheading({ heading, sx }: Props) {
  return (
    <>
      <Typography
        sx={{
          color: "var( --text-heading)",
          fontSize: { md: "20px", sm: "16px", xs: "14px" },
          fontStyle: "normal",
          fontWeight: "600",
          marginTop: "30px",
          ...sx,
        }}
      >
        {heading}
      </Typography>
    </>
  );
}
