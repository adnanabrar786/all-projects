import { Stack, Typography } from '@mui/material';
import { AppLoader } from 'components/common/AppLoader';
import CustomButton from '../home/NewDashboard/CustomButton';

interface Props {
  onClick?: () => void;
  handleDelete?: any;
  handleCancel?: any;
  text?: string;
  cancelBtn?: string;
  deleteBtn?: string;
  setDeleteBox?: (val: boolean) => void;
  deleteGuestLoading?: boolean;
}

const GuestVendorCardDeleteMobile = ({
  onClick,
  handleDelete,
  handleCancel,
  text,
  cancelBtn,
  deleteBtn,
  setDeleteBox,
  deleteGuestLoading,
}: Props) => {
  return (
    <Stack>
      <Stack
        sx={{
          display: { lg: 'none', xs: 'block' },
          position: 'absolute',
          left: 0,
          zIndex: 1,
          width: '100%',
          bottom: deleteBtn === 'Delete Vendor' ? 0 : 32,
        }}
      >
        <Stack
          sx={{
            borderRadius: '1rem',
            padding: '0.50rem 0',
            backgroundColor: 'white',
            width: '97%',
            margin: '0 auto',
          }}
        >
          <Typography
            sx={{
              color: 'var(--Neutral, rgba(0, 0, 0, 0.40))',
              backgroundColor: 'white',
              fontFamily: 'Poppins',
              fontSize: '0.75rem',
              fontWeight: '400',
              padding: '0.81rem 0',
              textAlign: 'center',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              borderBottom: '1px solid #B0B0B0 !important',
            }}
          >
            {text}
          </Typography>
          <CustomButton
            onClick={handleDelete}
            sx={{
              backgroundColor: '#ffffff !important',
              border: 'none',
              color: 'rgba(255, 84, 73, 1)',
              fontWeight: '500',
              fontSize: '1rem',
              lineHeight: '24px',
              padding: '0.875rem 0rem',
              height: '50px',
              borderRadius: '0',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          >
            {!deleteGuestLoading ? (
              deleteBtn
            ) : (
              <>
                <AppLoader
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'red',
                  }}
                  size={20}
                  color={'red'}
                />
              </>
            )}
          </CustomButton>
        </Stack>
        <Stack
          sx={{
            padding: '0 0.25rem',
          }}
        >
          <CustomButton
            onClick={() => {
              if (setDeleteBox) {
                setDeleteBox(false);
              }
            }}
            sx={{
              backgroundColor: '#ffffff !important',
              border: 'none',
              color: 'rgba(255, 84, 73, 1)',
              fontWeight: '500',
              fontSize: '1rem',
              lineHeight: '24px',
              padding: '0.875rem 0rem',
              marginTop: deleteBtn === 'Delete Vendor' ? '0.7rem !important' : '0.8rem !important',
            }}
          >
            {cancelBtn}
          </CustomButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GuestVendorCardDeleteMobile;
