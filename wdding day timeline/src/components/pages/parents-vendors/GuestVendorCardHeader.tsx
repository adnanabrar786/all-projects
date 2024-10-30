import { Stack, SxProps } from '@mui/material';
import Image from 'next/image';
import { memo } from 'react';
import { getFirstLetter } from 'utils/strings';
import CustomText from '../home/NewDashboard/CustomText';
interface Props {
  sx?: SxProps;
  name: string;
  img?: string | null;
  addButtonText: string;
  showNewform: boolean;
  toggleForm: () => void;
  expanded?: boolean;
  itemBackgroundColor?: string;
}

const GuestVendorCardHeader = ({
  name,
  sx,
  img,
  expanded,
  toggleForm,
  showNewform,
  addButtonText,
  itemBackgroundColor = 'bg-[#FABB18]',
}: Props) => {
  return (
    <Stack sx={{ ...sx }}>
      <Stack
        direction="row"
        sx={{
          padding: '15.7px 14px 12px 15px',
          gap: '4px',
          alignItems: 'center',
          borderRadius: '16px',
        }}
      >
        <Stack
          sx={{
            width: '100%',
          }}
        >
          <Stack direction="row" gap={1}>
            {img ? (
              <div
                className={`rounded-[50%] px-0.1 pt-[0.3px] flex items-center justify-center cursor-pointer ${
                  name ? itemBackgroundColor : ''
                } text-white w-14 h-14 relative`}
              >
                <Image
                  src={img}
                  alt=""
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div
                className={`rounded-full px-2 flex items-center justify-center cursor-pointer ${
                  name ? itemBackgroundColor : ''
                } text-white w-12 h-12 relative mr-1 sm:mr-1`}
              >
                {getFirstLetter(name).toUpperCase()}
              </div>
            )}
          </Stack>

          <CustomText
            text={name}
            sx={{
              marginTop: '5px',
              lineHeight: '21px',
              letterSpacing: '1%',
              fontWeight: '500',
              fontSize: '14px',
              color: '#333',
            }}
          />
        </Stack>

        <Stack
          sx={{
            display: { lg: 'none', xs: 'flex' },
          }}
        >
          {expanded ? (
            <Image src="/images/dashboard/upArrow.svg" alt="" width={11} height={5} />
          ) : (
            <Image src="/images/dashboard/downArrow.svg" alt="" width={11} height={5} />
          )}
        </Stack>
      </Stack>
      {showNewform ? (
        <></>
      ) : (
        <Stack
          direction={'row'}
          sx={{
            borderTop: '1px solid #EAEAEA',
            backgroundColor: 'white',
            width: '100%',
            justifyContent: 'flex-end',
            borderBottom: { lg: '1px solid #EAEAEA', xs: showNewform ? '1px solid #EAEAEA' : 'none' },
            borderBottomRightRadius: { lg: '0px', xs: '16px' },
            borderBottomLeftRadius: { lg: '0px', xs: '16px' },
          }}
        >
          <Stack
            sx={{
              padding: '16px 10px',
              justifyContent: 'space-between',
              width: { lg: '100%', xs: 'auto' },
            }}
          >
            <Stack
              direction={'row'}
              onClick={(e) => {
                e.stopPropagation();
                toggleForm();
              }}
              sx={{
                justifyContent: 'flex-end',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Image src="/images/dashboard/addEvent.svg" alt="" width={12} height={12} />
              <CustomText
                text={addButtonText}
                sx={{
                  fontSize: '12px',
                  color: 'rgba(0, 0, 0, 0.80)',
                  opacity: '60%',
                  lineHeight: '18px',
                  fontWeight: '400',
                  fontStyle: 'normal',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default memo(GuestVendorCardHeader);
