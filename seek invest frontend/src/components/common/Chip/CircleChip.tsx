import { SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";

interface Props {
  text: string;
  isActiveTab: boolean;
  sx?: SxProps;
}

const CircleChip = ({ text, isActiveTab, sx }: Props) => {
  return (
    <TextXs
      text={text}
      sx={{
        backgroundColor: "var(--lightest-blue)",
        padding: "0.125rem 0.5rem",
        borderRadius: "1rem",
        textAlign: "center",
        fontWeight: "500",
        fontSize: "0.75rem",
        color: isActiveTab ? "var(--primary)" : "var(--text-primary)",
        ...sx,
      }}
    />
  );
};

export default CircleChip;
