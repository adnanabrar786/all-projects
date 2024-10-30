import { Stack, SxProps } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import TextXs from "components/common/Text/TextXs";

interface Props {
  emptyColor: string;
  value: number | null;
  sxText?: SxProps;
  props?: CircularProgressProps;
}

const thickness = 5;
const size = 70;

export default function FilledCircularProgress({
  emptyColor,
  value,
  props,
  sxText,
}: Props) {
  let color = "transparent";

  if (value !== null) {
    if (value >= 0 && value <= 33) {
      color = "var(--carnelian)";
    } else if (value >= 34 && value <= 66) {
      color = "var(--mikado-yellow)";
    } else if (value >= 67 && value <= 100) {
      color = "var(--green-medium)";
    }
  }

  return (
    <Stack
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: emptyColor,
        }}
        size={size}
        thickness={thickness}
        value={100}
        {...props}
      />

      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: color,
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        value={value === 0 ? 100 : value ?? 0}
        size={size}
        thickness={thickness}
        {...props}
      />

      <TextXs
        text={value !== null ? `${value}` : "-"}
        sx={{
          position: "absolute",
          fontSize: "0.94275rem",
          fontWeight: "700",
          lineHeight: "1.41406rem",
          color: value === null ? "var(--gray-300)" : "var(--text-primary)",
          ...sxText,
        }}
      />
    </Stack>
  );
}
