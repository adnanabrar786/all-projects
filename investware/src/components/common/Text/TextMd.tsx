import { StyledTextMd } from '@/components/common/StyledCommons';
import { SxProps } from '@mui/material';

interface Props {
  text: string;
  noWrap?: boolean;
  sx?: SxProps;
  onClick?: () => void;
}

const TextMd = ({ text, sx, noWrap, onClick }: Props) => {
  return (
    <StyledTextMd
      onClick={onClick}
      noWrap={noWrap}
      sx={{
        ...sx,
      }}
    >
      {text}
    </StyledTextMd>
  );
};

export default TextMd;
