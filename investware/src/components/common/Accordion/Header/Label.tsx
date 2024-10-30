import { SxProps } from '@mui/material';
import TextXs from '../../Text/TextXs';

interface Props {
  text: string;
  sx?: SxProps;
}

const Label = ({ text, sx }: Props) => {
  return (
    <>
      <TextXs
        sx={{
          lineHeight: '166%',
          letterSpacing: '0.025rem',
          color: 'var(--text-dark-grey)',
          fontSize: { md: '0.8rem', xs: '0.75rem' },
          ...sx,
        }}
        text={text}
      />
    </>
  );
};

export default Label;
