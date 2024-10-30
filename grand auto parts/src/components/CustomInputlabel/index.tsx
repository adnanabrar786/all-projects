import { InputLabel, SxProps } from "@mui/material";

interface Props {
  name: string;
  sx?: SxProps;
}

const CustomInputlabel = ({ name, sx }: Props) => {
  return (
    <>
      <InputLabel
        sx={{
          fontSize: { md: "16px", xs: "14px" },
          fontStyle: "normal",
          color: "(var(--text-heading) )",
          fontWeight: "700",
          lineHeight: "200%",
          ...sx,
        }}
      >
        {name}
      </InputLabel>
    </>
  );
};

export default CustomInputlabel;
