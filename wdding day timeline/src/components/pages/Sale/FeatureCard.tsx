import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import CustomText from '../home/NewDashboard/CustomText';

interface Props {
  src: string;
  title: string;
  text: string;
  bolText?: string;
  textTwo?: string;
}

const FeatureCard = ({ src, title, text, textTwo, bolText }: Props) => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          maxWidth: '808px',
          gap: '7px',
        }}
      >
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          sx={{
            gap: '12.27px',
            alignItems: {
              sm: 'center',
              xs: 'left',
            },
            justifyContent: {
              sm: 'left',
              xs: 'left',
            },
          }}
        >
          <Stack
            sx={{
              position: 'relative',
              width: { md: '40px', sm: '29.51px', xs: '28.56px' },
              height: { md: '32px', xs: '26px' },

              img: {
                width: '100%',
                height: '100%',
                position: 'absolute',
              },
            }}
          >
            <Image priority alt="pic" src={src} width={40} height={32} quality={100} />
          </Stack>

          <CustomText
            sx={{
              color: 'var(--purple)',
              fontWeight: '600',
              fontSize: { md: '20px', sm: '16px' },
              lineHeight: { md: '28.2px', sm: '22.56px' },
            }}
            text={title}
          />
        </Stack>

        <Typography
          sx={{
            textAlign: 'left',
            fontFamily: 'Poppins',
            color: 'var(--black)',
            fontWeight: '400',
            fontSize: { md: '14px', sm: '12px', xs: '14px' },
            lineHeight: { md: '23.1px', sm: '19.2px', xs: '23.24px' },
            span: {
              fontWeight: '700',
            },
          }}
        >
          {text} <span>{bolText}</span> {textTwo}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FeatureCard;
