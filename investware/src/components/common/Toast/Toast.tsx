import {
  StyledToastContainer,
  StyledToastSubContainer,
  StyledToastText,
  StyledToastTextStack,
} from '@/components/common/StyledCommons';
import { crossIcon, crossWhiteIcon, ErrorLogo, RedInfo, Success } from '@/constants/images.routes';
import { Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export enum toastTypes {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export interface contents {
  title: string;
  description: string;
}

export interface contentTest {
  type: toastTypes;
  description: string;
  link?: string;
  linkHref?: string;
}

const image: { [type in toastTypes]: string } = {
  [toastTypes.success]: Success,
  [toastTypes.error]: RedInfo,
  [toastTypes.info]: ErrorLogo,
  [toastTypes.warning]: ErrorLogo,
};

const crossIconImage: { [type in toastTypes]: string } = {
  [toastTypes.success]: crossWhiteIcon,
  [toastTypes.error]: crossIcon,
  [toastTypes.info]: crossWhiteIcon,
  [toastTypes.warning]: crossWhiteIcon,
};

const background: { [type in toastTypes]: string } = {
  [toastTypes.success]: 'var(--green)',
  [toastTypes.error]: 'var(--light-red)',
  [toastTypes.info]: 'var(--green)',
  [toastTypes.warning]: 'var(--green)',
};

const Toast: React.FC<contentTest> = ({ type, description, link, linkHref }) => (
  <>
    {toast.custom((t) => (
      <StyledToastContainer>
        <StyledToastSubContainer
          sx={{
            backgroundColor: background[type],
          }}
        >
          <Stack
            sx={{
              padding: '0.5rem 0rem 1.4rem 0.8rem',
            }}
          >
            <Stack
              sx={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                cursor: 'pointer',
                paddingRight: '0.3rem',
              }}
            >
              <Image priority src={crossIconImage[type]} alt={'icon'} width={12} height={12} />
            </Stack>
            <Stack
              direction={'row'}
              sx={{
                gap: '0.5rem',
                marginTop: '0.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: '1.5rem',
              }}
            >
              <Image priority src={image[type]} alt={'icon'} width={20} height={20} />
              <StyledToastTextStack direction={'row'}>
                <StyledToastText
                  sx={{
                    color: type === toastTypes.error ? 'var(--maroon)' : 'var(--white)',
                  }}
                >
                  {description}
                </StyledToastText>

                {link && linkHref && <Link href={linkHref}>{link}</Link>}
              </StyledToastTextStack>
            </Stack>
          </Stack>
        </StyledToastSubContainer>
      </StyledToastContainer>
    ))}
  </>
);

export default Toast;
