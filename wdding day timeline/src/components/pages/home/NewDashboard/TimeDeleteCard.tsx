import { Box, Stack } from '@mui/material';
import CustomButton from './CustomButton';
import CustomText from './CustomText';

interface Props {
  onClick?: () => void;
  handleSubmit: any;
}

const TimeDeleteCard = ({ onClick, handleSubmit }: Props) => {
  return (
    <Stack
      sx={{
        gap: '8px',
      }}
    >
      <Box sx={{ background: '#00000040', height: '100%', position: 'absolute', width: '100%', top: '0', left: '0' }} />
      <Stack
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '10px 0 15px 0px',
          zIndex: 1,
        }}
      >
        <Stack
          sx={{
            borderBottom: '1px solid rgba(176, 176, 176, 1)',
          }}
        >
          <CustomText
            text="Are you sure you want to delete this event?"
            sx={{
              fontSize: '12px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.4)',
              textAlign: 'center',
              padding: '0px 0 13px 0px',
            }}
          />
        </Stack>
        <div onClick={handleSubmit}>
          <CustomText
            text="Delete Event"
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              color: 'rgba(255, 84, 73, 1)',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 1)',
              fontWeight: '600',
              padding: '13px 0 0px 0px',
              cursor: 'pointer',
            }}
          />
        </div>
      </Stack>
      <CustomButton
        onClick={onClick}
        type="button"
        sx={{
          backgroundColor: '#ffffff !important',
          border: 'none',
          color: 'rgba(255, 84, 73, 1)',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '24px',
        }}
      >
        Cancel
      </CustomButton>
    </Stack>
  );
};

export default TimeDeleteCard;
