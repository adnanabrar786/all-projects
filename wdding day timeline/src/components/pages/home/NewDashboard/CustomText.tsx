import { SxProps, Typography } from '@mui/material';

interface Props {
  text?: string;
  sx?: SxProps;
}

const CustomText = ({ text, sx }: Props) => {
  return (
    <Typography
      sx={{
        fontFamily: 'Poppins',
        color: '#333333',
        fontWeight: '400',
        fontSize: '14px',
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomText;
