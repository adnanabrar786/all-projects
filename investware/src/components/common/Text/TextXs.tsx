import { StyledTextXs } from '@/components/common/StyledCommons';
import { SxProps } from '@mui/material';
import { MouseEventHandler } from 'react';

interface Props {
  text: string | string[];
  sx?: SxProps;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  noWrap?: boolean;
}

const TextXs = ({ text, sx, noWrap, onClick }: Props) => {
  return (
    <StyledTextXs
      onClick={onClick}
      noWrap={noWrap}
      sx={{
        ...sx,
      }}
    >
      {text}
    </StyledTextXs>
  );
};

export default TextXs;
