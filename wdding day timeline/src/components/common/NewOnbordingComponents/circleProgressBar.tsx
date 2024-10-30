import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant=""
        {...props}
        value={100}
        size={170}
        thickness={8}
        sx={{
          color: '#C2F2E9',
          zIndex: 1,
        }}
      />
      <CircularProgress
        variant="indeterminate"
        {...props}
        size={170}
        thickness={8}
        sx={{
          color: '#00CAA5',
          position: 'absolute',
          zIndex: 2,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#00D5D4',
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
