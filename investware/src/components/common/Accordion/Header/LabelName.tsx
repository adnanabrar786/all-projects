import { SxProps } from '@mui/material';
import TextMd from '../../Text/TextMd';

interface Props {
  text: string;
  sx?: SxProps;
}

const LabelName = ({ text, sx }: Props) => {
  return (
    <>
      <TextMd
        sx={{
          fontSize: { md: '1rem', xs: '0.875rem' },
          fontWeight: '400',
          lineHeight: '150%',
          letterSpacing: '0.00938rem',
          color: 'var(--text-black)',
          ...sx,
        }}
        text={text}
      />
    </>
  );
};

export default LabelName;
