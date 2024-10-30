import { Stack, Typography } from '@mui/material';
import CircularWithValueLabel from './circleProgressBar';

const Loader = () => {
  return (
    <Stack
      sx={{
        height: '75vh',
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Stack>
          <CircularWithValueLabel />
        </Stack>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            textAlign: 'center',
            marginTop: '3.875rem',
            lineHeight: '1.513rem',
            color: '#000000',
            opacity: '80%',
          }}
        >
          Building your personalized Wedding Day Timeline
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Loader;
