import { memo } from 'react';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Link from 'components/common/Link';
import { RESET_TIMELINE_URL } from 'routes';
import { Typography, Stack, Modal } from '@mui/material';

interface Props {
  open: boolean;
  toggleModal: () => void;
}

const ModalResetTimeline = ({ open, toggleModal }: Props) => {
  return (
    <Modal open={open}>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '8px',
        }}
      >
        <Stack
          sx={{
            textAlign: 'center',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            width: { sm: '340px', xs: '315px' },
          }}
        >
          <Typography
            id="keep-mounted-modal-description"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '12px',
              color: '#B0B0B0 ',
              lineHeight: '18px',
              fontWeight: '400',
              padding: '12px 41px',
              span: {
                fontWeight: '600',
              },
            }}
          >
            <span> WARNING:</span> This action will take you back through the onboarding quiz if you need to reset and
            make a new timeline. You will have the option to cancel the process and return to your current timeline.
          </Typography>
          <Link href={RESET_TIMELINE_URL}>
            <CustomText
              text="Reset The Timeline"
              sx={{
                padding: '12px',
                textAlign: 'center',
                borderTop: '1px solid rgba(176, 176, 176, 1)',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            />
          </Link>
        </Stack>
        <Stack
          sx={{
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            width: { sm: '340px', xs: '315px' },
          }}
        >
          <CustomButton
            sx={{
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              color: 'rgba(255, 84, 73, 1)',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '16px',
              textTransform: 'initial',
              lineHeight: '24px',
            }}
            onClick={toggleModal}
          >
            Cancel
          </CustomButton>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default memo(ModalResetTimeline);
