import { Box, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { MutableRefObject } from 'react';

type Prop = {
  icon: JSX.Element;
  title: string;
  isLoading?: boolean;
  description: string;
  buttonText: string;
  buttonIcon: JSX.Element;
  onClick?: () => void;
  buttonRef?: MutableRefObject<any>;
  href?: string;
  active?: boolean;
};
export default function ShareTimelineBox({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  isLoading,
  href,
  active,
  onClick,
  buttonRef,
}: Prop) {
  return (
    <Box
      sx={{
        width: { xs: '100%', lg: '363px', xl: '100%' },
        border: '0.5px solid #CACACA',
        borderRadius: '8px',
        padding: '15px 10px 10px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '15px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Box sx={{ marginLeft: '8px' }}>{icon}</Box>
        <Box>
          <Typography
            sx={{ fontSize: '12px', color: '#161616', fontFamily: 'Poppins', marginBottom: '5px', fontWeight: '500' }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: '10px', fontWeight: '400', color: '#6A6A6A', fontFamily: 'Poppins', lineHeight: '200%' }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {href ? (
        <Link href={href} target="_blank">
          <Box
            ref={buttonRef}
            onClick={onClick}
            sx={{
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              height: '36px',
              backgroundColor: '#00CAA5',
              color: 'white',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <CircularProgress size={'16px'} sx={{ color: 'white' }} />
            ) : (
              <>
                {buttonIcon}
                <Typography sx={{ fontSize: '10.5px', fontWeight: '600', fontFamily: 'Poppins' }}>
                  {buttonText}
                </Typography>
              </>
            )}
          </Box>
        </Link>
      ) : (
        <Box
          ref={buttonRef}
          onClick={onClick}
          sx={{
            borderRadius: '4px',
            cursor: active ? 'not-allowed' : 'pointer',
            width: '100%',
            height: '36px',
            backgroundColor: '#00CAA5',
            color: 'white',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <CircularProgress size={'16px'} sx={{ color: 'white' }} />
          ) : (
            <>
              {buttonIcon}
              <Typography sx={{ fontSize: '10.5px', fontWeight: '600', fontFamily: 'Poppins' }}>
                {buttonText}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
