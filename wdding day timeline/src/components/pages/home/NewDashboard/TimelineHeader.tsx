import { Stack, SxProps } from '@mui/material';
import Image from 'next/image';
import CustomText from './CustomText';

interface Props {
  primaryName?: string;
  img?: string;
  showGroomImage?: boolean;
  sx?: SxProps;
  fianceName?: string;
  fianceImage?: string;
  bothImages?: boolean;
  secondary?: boolean;
}

const TimelineHeader = ({ primaryName, bothImages, img, fianceName, fianceImage, sx, secondary }: Props) => {
  return (
    <Stack sx={{ ...sx }}>
      <Stack
        sx={{
          padding: '15.7px 14px 12px 15px',
          gap: '4px',
        }}
      >
        {bothImages ? (
          img && fianceImage ? (
            <Stack direction={'row'} gap={1}>
              {img && (
                <Stack
                  sx={{
                    border: '4px solid rgba(250, 187, 24, 0.50)',
                    borderRadius: '2.4375rem',
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                  />
                </Stack>
              )}
              {fianceImage && (
                <Stack
                  sx={{
                    border: '4px solid rgba(200, 162, 200, 0.50)',
                    borderRadius: '2.4375rem',
                  }}
                >
                  <Image
                    src={fianceImage}
                    alt=""
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                  />
                </Stack>
              )}
            </Stack>
          ) : img ? (
            <>
              <Stack
                direction={'row'}
                gap={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                {img && (
                  <Stack
                    sx={{
                      border: '4px solid rgba(250, 187, 24, 0.50)',
                      borderRadius: '2.4375rem',
                    }}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={48}
                      height={48}
                      style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                    />
                  </Stack>
                )}
                {fianceName && (
                  <CustomText
                    text={fianceName.charAt(0).toUpperCase()}
                    sx={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: '20px',
                      backgroundColor: '#C8A2C8',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </Stack>
            </>
          ) : fianceImage ? (
            <>
              <Stack
                direction={'row'}
                gap={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                {primaryName && (
                  <CustomText
                    text={primaryName.charAt(0).toUpperCase()}
                    sx={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: '20px',
                      backgroundColor: '#FABB18',
                      borderRadius: '50%',
                    }}
                  />
                )}
                {fianceImage && (
                  <Stack
                    sx={{
                      border: '4px solid rgba(200, 162, 200, 0.50)',
                      borderRadius: '2.4375rem',
                    }}
                  >
                    <Image
                      src={fianceImage}
                      alt=""
                      width={48}
                      height={48}
                      style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                    />
                  </Stack>
                )}
              </Stack>
            </>
          ) : (
            <>
              <Stack direction={'row'} gap={1}>
                {primaryName && (
                  <CustomText
                    text={primaryName.charAt(0).toUpperCase()}
                    sx={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: '20px',
                      backgroundColor: '#FABB18',
                      borderRadius: '50%',
                    }}
                  />
                )}
                {fianceName && (
                  <CustomText
                    text={fianceName.charAt(0).toUpperCase()}
                    sx={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: '20px',
                      backgroundColor: '#C8A2C8',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </Stack>
            </>
          )
        ) : (
          <Stack direction="row" gap={1}>
            {img ? (
              <Stack
                sx={{
                  border: `4px solid ${secondary ? 'rgba(200, 162, 200, 0.50)' : 'rgba(250, 187, 24, 0.50)'}`,
                  borderRadius: '2.4375rem',
                }}
              >
                <Image
                  src={img}
                  alt=""
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%', height: '48px', width: '48px', objectFit: 'cover' }}
                />
              </Stack>
            ) : (
              <CustomText
                text={primaryName ? primaryName.charAt(0).toUpperCase() : ''}
                sx={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '20px',
                  backgroundColor: secondary ? '#C8A2C8' : '#FABB18',
                  borderRadius: '50%',
                }}
              />
            )}
          </Stack>
        )}

        <CustomText
          text={primaryName}
          sx={{
            lineHeight: '21px',
            letterSpacing: '1%',
            fontWeight: '500',
            fontSize: '14px',
            color: '#333',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default TimelineHeader;
