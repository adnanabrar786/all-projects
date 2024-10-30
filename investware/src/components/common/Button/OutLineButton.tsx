import { AppLoader } from '@/components/common/AppLoader';
import { StyledButtonText, StyledOutLineButtonContainer } from '@/components/common/StyledCommons';
import { SxProps } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  sxText?: SxProps;
}

const OutLineButton = ({ text, onClick, type, startIcon, endIcon, sx, disabled, loading, sxText }: Props) => {
  return (
    <StyledOutLineButtonContainer
      disableElevation
      disabled={disabled}
      type={type}
      variant={'contained'}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        ...sx,
      }}
    >
      {loading ? (
        <AppLoader color="var(--sky-blue)" />
      ) : (
        <StyledButtonText
          sx={{
            ...sxText,
          }}
        >
          {text}
        </StyledButtonText>
      )}
    </StyledOutLineButtonContainer>
  );
};

export default OutLineButton;
