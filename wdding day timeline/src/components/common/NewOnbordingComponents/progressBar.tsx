import { Box, LinearProgress } from '@mui/material';

export function ProgressBarWithLabel({ value, max }) {
  const normalise = (value) => ((value - 0) * 100) / (max - 0);

  return (
    <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
      <Box width="100%" sx={{ position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={normalise(value)}
          sx={{
            height: 10,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: '#00CAA5', // Teal color for the progress
              opacity: '60%',
            },
            '& .MuiLinearProgress-barColorPrimary': {
              backgroundColor: '#00CAA5', // Teal color for the progress
              opacity: '60%',
            },
            '& .MuiLinearProgress-dashed': {
              backgroundImage: 'none', // Remove dashes, if any
            },
            '& .MuiLinearProgress-root': {
              backgroundColor: 'red !important', // Light grey for the track
            },
            backgroundColor: '#F5F5F5',
          }}
        />
      </Box>
    </Box>
  );
}
