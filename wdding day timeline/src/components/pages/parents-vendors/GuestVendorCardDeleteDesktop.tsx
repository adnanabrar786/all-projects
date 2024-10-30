import { Stack } from '@mui/material';
import { AppLoader } from 'components/common/AppLoader';
import CustomText from 'components/pages/home/NewDashboard/CustomText';
import CustomButton from 'components/pages/home/NewDashboard/CustomButton';
interface Props {
  onClick?: () => void;
  handleDelete?: any;
  text?: string;
  cancelBtn?: string;
  deleteBtn?: string;
  setDeleteBox?: (val: boolean) => void;
  deleteGuestLoading?: boolean;
}

const GuestVendorCardDeleteDesktop = ({
  handleDelete,
  text,
  cancelBtn,
  deleteBtn,
  setDeleteBox,
  deleteGuestLoading,
}: Props) => {
  return (
    <Stack
      sx={{
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          gap: deleteBtn === 'Delete Vendor' ? '24px' : '30px',
          position: 'absolute',
          left: 0,
          bottom: deleteBtn === 'Delete Vendor' ? 110 : 120,
          width: '100%',
          display: { lg: 'flex', xs: 'none' },
          // TODO: for future use
          // px: deleteBtn === 'Delete Vendor' ? '0.5rem' : '0.5rem',
          height: '100%',
        }}
      >
        {/* TODO : for future use */}
        {/* <Box
          sx={{
            background: '#00000040',
            height: { lg: '600px', xs: '800px' },
            position: 'absolute',
            width: '100%',
            top: -310,
            left: '0',
          }}
        /> */}
        <Stack
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '12px 0px',
            zIndex: 1,
          }}
        >
          <Stack>
            <CustomText
              text={text}
              sx={{
                fontSize: '12px',
                lineHeight: '18px',
                color: 'rgba(0, 0, 0, 0.4)',
                textAlign: 'center',
              }}
            />
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          sx={{
            gap: '0.5rem',
            zIndex: 1,
            width: '100%',
          }}
        >
          <CustomButton
            disabled={deleteGuestLoading}
            onClick={() => {
              if (setDeleteBox) {
                setDeleteBox(false);
              }
            }}
            type="button"
            sx={{
              backgroundColor: '#ffffff !important',
              border: 'none',
              color: 'rgba(255, 84, 73, 1)',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              padding: '0.875rem 0rem',
            }}
          >
            {cancelBtn}
          </CustomButton>
          <CustomButton
            onClick={handleDelete}
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
      </Stack>
    </Stack>
  );
};

export default GuestVendorCardDeleteDesktop;
