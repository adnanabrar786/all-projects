import { Stack, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";

interface Props {
  weight: string;
  sxText?: SxProps;
}

const TopicWeight = ({ weight, sxText }: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "fit-content",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--ghost-white)",
        border: "1px solid var(--gray-300)",
        borderRadius: "0.25rem",
        padding: "0.125rem 0.25rem",
        gap: "0.5rem",
      }}
    >
      <TextXs
        text={"Weight"}
        sx={{
          fontWeight: "500",
          lineHeight: "1.125rem",
          color: "#000",
          fontSize: "0.625rem",
          ...sxText,
        }}
      />

      <TextXs
        text={`${weight}%`}
        sx={{
          lineHeight: "1.125rem",
          fontWeight: "600",
          fontSize: "0.625rem",
          color: "var(--text-grey)",
          ...sxText,
        }}
      />
    </Stack>
  );
};

export default TopicWeight;
