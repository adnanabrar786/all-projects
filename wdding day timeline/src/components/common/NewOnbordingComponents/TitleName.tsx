import { SxProps, Typography } from '@mui/material';

interface props {
  title: string;
  sx?: SxProps;
}

const TitleName = ({ title, sx }: props) => {
  return (
    <Typography
      sx={{
        lineHeight: '1.513rem',
        fontSize: '1.25rem',
        fontWeight: '700',
        textAlign: 'center',
        opacity: '80%',
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};

export default TitleName;
