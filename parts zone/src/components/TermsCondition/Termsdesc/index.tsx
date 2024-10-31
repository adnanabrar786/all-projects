import { SxProps, Typography } from "@mui/material";

interface Props {
  desc: string;
  sx?: SxProps;
}

const Termsdesc = ({ desc, sx }: Props) => {
  return (
    <>
      <Typography
        sx={{
          color: "var( --text-grey)",
          fontSize: { md: "18.496px", xs: "14px" },
          fontWeight: "400",
          lineHeight: "200%",
          fontStyle: "normal",
          ...sx,
        }}
      >
        {desc}
      </Typography>
    </>
  );
};

export default Termsdesc;
