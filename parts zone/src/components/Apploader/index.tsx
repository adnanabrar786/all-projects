import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { CSSProperties, memo } from "react";

interface Props {
  sx?: SxProps<Theme>;
  size?: number;
  style?: CSSProperties;
  color?: string;
}

const AppLoaderComponent = ({
  sx,
  size = 40,
  style,
  color = "var(--sky-blue)",
}: Props) => {
  const boxStyle: SxProps<Theme> = sx
    ? sx
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };

  return (
    <Box sx={boxStyle}>
      <CircularProgress sx={{ color: color }} size={size} style={style} />
    </Box>
  );
};

export const AppLoader = memo(AppLoaderComponent);
