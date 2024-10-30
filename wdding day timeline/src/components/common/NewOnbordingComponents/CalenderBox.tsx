import { Stack, SxProps, Typography } from '@mui/material';

interface TProps {
  value: string | number;
  onClick: (value: string) => void;
  data: {
    id: string | number;
    label: string;
  }[];
  sx?: SxProps;
}

const CalenderBox = ({ data, onClick, value, sx }: TProps) => {
  return (
    <Stack sx={{ height: '19.25rem', overflowY: 'auto' }}>
      {data.map((time, index) => (
        <Stack onClick={() => onClick(`${time.label}`)} key={`${time.label}${index}`}>
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '0.875rem',
              backgroundColor: `${value}` === `${time.label}` ? '#0275FF' : 'transparent',
              color: `${value}` === `${time.label}` ? '#ffffff' : '#000000',
              lineHeight: '1.026rem',
              height: '2.5rem',
              width: '3.75rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0.125rem',
              justifyContent: 'center',
              cursor: 'pointer',
              ...sx,
            }}
          >
            {time.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default CalenderBox;
