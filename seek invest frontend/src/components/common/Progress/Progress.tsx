import { Box, SxProps } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { normalizeProgressValue } from "utils/maths";

const BorderLinearProgress = styled(LinearProgress)(({ theme, sx }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "var(--gray-100)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "var(--primary)",
    ...sx,
  },
}));

interface Props {
  value: number;
  sx?: SxProps;
  normailize?: boolean;
}
export default function CustomizedProgressBars({
  value,
  sx,
  normailize = true,
}: Props) {
  if (normailize) {
    value = normalizeProgressValue(value) * 10;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress
        variant="determinate"
        value={value}
        sx={{ ...sx }}
      />
    </Box>
  );
}
