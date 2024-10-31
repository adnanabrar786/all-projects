import { Typography } from "@mui/material";

interface Props {
  heading: string;
  termsNumber: number;
}

const Termsheading = ({ heading, termsNumber }: Props) => {
  return (
    <>
      <Typography
        sx={{
          color: "var(--dark-blue)",
          fontSize: { sm: "25.432px", xs: "20px" },
          fontWeight: "700",
          lineHeight: "34.333px",
          fontStyle: "normal",
          textAlign: { md: "left", xs: "center" },
        }}
      >
        <span>{termsNumber}</span> {heading}
      </Typography>
    </>
  );
};

export default Termsheading;
