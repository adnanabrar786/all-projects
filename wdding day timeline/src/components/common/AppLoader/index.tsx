import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { CSSProperties, memo } from 'react';

interface Props {
  sx?: SxProps<Theme>;
  size?: number;
  style?: CSSProperties;
  color?: string;
  height?: string;
}

const AppLoaderComponent = ({ sx, size = 40, style, color = '#00D5D4', height = '100vh' }: Props) => {
  const boxStyle: SxProps<Theme> = sx
    ? sx
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
      };

  return (
    <Box sx={boxStyle}>
      <CircularProgress sx={{ color: color }} size={size} style={style} />
    </Box>
  );
};

export const AppLoader = memo(AppLoaderComponent);
