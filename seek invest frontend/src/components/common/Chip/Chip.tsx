import { SxProps } from "@mui/material";
import TextSm from "components/common/Text/TextSm";

interface Props {
  text: string;
  sx?: SxProps;
}

const Chip = ({ text, sx }: Props) => {
  return (
    <TextSm
      text={text}
      sx={{
        fontSize: "0.75rem",
        fontWeight: "500",
        padding: "0.125rem 0.5rem",
        width: "fit-content",
        borderRadius: "1rem",
        ...sx,
      }}
    />
  );
};

export default Chip;
