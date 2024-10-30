import { Stack, SxProps } from '@mui/material';
import Image from 'next/image';
import TextXs from '../Text/TextXs';

interface Props {
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  text: string;
  sxText?: SxProps;
  sxRow?: SxProps;
  bg?: boolean;
  onClick?: () => void;
}

const IconText = ({ icon, iconWidth, iconHeight, text, sxText, sxRow, bg, onClick }: Props) => {
  return (
    <Stack
      onClick={onClick}
      direction={'row'}
      sx={
        bg
          ? {
              alignItems: 'center',
              padding: '0.25rem 0.75rem',
              gap: '0.5rem',
              bgcolor: 'var(--gray-100)',
              borderRadius: '0.25rem',
              ...sxRow,
            }
          : {
              alignItems: 'center',
              gap: '0.5rem',
              ...sxRow,
            }
      }
    >
      {icon && <Image priority src={icon} alt={'icon'} width={iconWidth} height={iconHeight} />}
      <TextXs
        text={text}
        sx={{
          fontWeight: '400',
          lineHeight: '175%',
          color: 'var(--text-grey-200)',
          fontSize: '1rem',
          letterSpacing: '0.00938rem',
          ...sxText,
        }}
      />
    </Stack>
  );
};

export default IconText;
