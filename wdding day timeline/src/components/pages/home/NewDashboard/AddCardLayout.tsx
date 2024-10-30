import { Stack, SxProps } from '@mui/material';
import { AppLoader } from 'components/common/AppLoader';
import { ReactNode } from 'react';
import CustomButton from './CustomButton';
import CustomText from './CustomText';

interface Props {
  showEvent: boolean;
  setShowEvent: (showEvent: boolean) => void;
  children: ReactNode;
  title: string;
  handleSubmit: any;
  IsLoading: boolean;
  formik?: any;
  addEventCancelBtn?: boolean;
  sxButtonContainer?: SxProps;
}

const AddCardLayout = ({
  children,
  setShowEvent,
  title,
  handleSubmit,
  IsLoading,
  formik,
  addEventCancelBtn,
  sxButtonContainer,
}: Props) => {
  return (
    <Stack
      sx={{
        width: '100%',
        borderTop: '1px solid #EAEAEA',
        borderBottom: '1px solid #B0B0B0',
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'rgba(243, 243, 243, 1)',
          paddingBottom: '24px',
        }}
      >
        <Stack
          sx={{
            height: '40px',
            justifyContent: 'center',
            borderBottom: '1px solid #EAEAEA',
          }}
        >
          <CustomText
            text={title}
            sx={{
              fontSize: '12px',
              color: '#333333',
              lineHeight: '18px',
              fontWeight: '600',
              textAlign: 'center',
            }}
          />
        </Stack>

        <Stack
          sx={{
            padding: '12px 16px 0px 16px',
          }}
        >
          {children}

          <Stack
            sx={{
              gap: '12px',
              marginTop: '24px',
              ...sxButtonContainer,
            }}
          >
            {IsLoading ? (
              <AppLoader
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                }}
                size={40}
              />
            ) : (
              <>
                <CustomButton
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#B0B0B0 !important',
                    width: '100%',
                    border: '1px solid #B0B0B0 ',
                    borderRadius: '16px',
                    height: '44px',
                    color: '#ffff',
                    fontWeight: '500',
                    textTransform: 'initial',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                  onClick={handleSubmit}
                >
                  Add Event
                </CustomButton>
                <CustomButton
                  sx={{
                    textTransform: 'initial',
                    backgroundColor: '#ffffff !important',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '500',
                  }}
                  onClick={() => {
                    if (addEventCancelBtn) {
                      formik.setErrors({
                        event_name: '',
                        clock: '',
                        minutes: '',
                        zone: '',
                        duration: '',
                      });
                    }
                    formik.resetForm();
                    setShowEvent(false);
                  }}
                >
                  Cancel
                </CustomButton>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddCardLayout;
