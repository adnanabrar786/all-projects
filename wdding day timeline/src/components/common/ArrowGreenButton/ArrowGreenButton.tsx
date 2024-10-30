import { Button, Stack, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import { AppLoader } from '../AppLoader';

interface props {
  src: string;
  onClick?: () => void;
  text?: string;
  textTwo?: string;
  sx?: SxProps;
  sxText?: SxProps;
  sxImage?: SxProps;
  loading?: boolean;
  loaderColor?: string;
}

const ArrowGreenButton = ({ src, onClick, text, sx, sxText, sxImage, loading, textTwo, loaderColor }: props) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        backgroundColor: 'var(--greenBlue) !important',
        ':hover': {
          backgroundColor: 'var(--greenBlue)',
        },
        fontSize: '14px',
        borderRadius: '38px',
        padding: '10px 32px',
        gap: '9px',
        ...sx,
      }}
    >
      {loading ? (
        <AppLoader
          color={loaderColor}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
          }}
          size={20}
        />
      ) : (
        <>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '21px',
              color: 'var(--white)',
              ...sxText,
              span: {
                fontWeight: 600,
              },
            }}
          >
            {text} {textTwo && <span>{textTwo}</span>}
          </Typography>

          <Stack
            sx={{
              width: '12px',
              height: '8px',
              position: 'relative',
              img: {
                width: '100%',
                height: '100%',
                position: 'absolute',
              },
              ...sxImage,
            }}
          >
            <Image priority alt="complex" src={src} fill sizes="100%" />
          </Stack>
        </>
      )}
    </Button>
  );
};

export default ArrowGreenButton;
