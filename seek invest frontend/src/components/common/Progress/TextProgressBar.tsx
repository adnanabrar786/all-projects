import { Box, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";

interface Props {
  leftText: string;
  middleText: string;
  rightText: string;
  leftWidth: number;
  middleWidth: number;
  rightWidth: number;
}
const TextProgressBar = ({
  leftText,
  middleText,
  rightText,
  leftWidth,
  middleWidth,
  rightWidth,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        height: "1rem",
      }}
    >
      {leftWidth > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: `${leftWidth}%`,
            backgroundColor: "var(--green-lightest)",
            height: "100%",
            borderRadius: "1rem 0 0 1rem",
          }}
        >
          <TextXs
            text={leftText}
            sx={{ fontSize: "0.75rem", color: "var(--text-primary)" }}
          />
        </Box>
      )}

      {middleWidth > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: `${middleWidth}%`,
            backgroundColor: "var(--gray-100)",
            height: "100%",
          }}
        >
          <TextXs
            text={middleText}
            sx={{ fontSize: "0.75rem", color: "var(--text-primary)" }}
          />
        </Box>
      )}

      {rightWidth > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: `${rightWidth}%`,
            backgroundColor: "var(--red-lightest)",
            height: "100%",
            borderRadius: "0rem 1rem 1rem 0rem",
          }}
        >
          <TextXs
            text={rightText}
            sx={{ fontSize: "0.75rem", color: "var(--text-primary)" }}
          />
        </Box>
      )}
    </Stack>
  );
};

export default TextProgressBar;
