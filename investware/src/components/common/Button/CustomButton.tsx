import { AppLoader } from '@/components/common/AppLoader';
import { StyledButtonContainer } from '@/components/common/Button/CustomButtonStyle';
import { StyledButtonText } from '@/components/common/StyledCommons';
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

const CustomButton = ({ text, onClick, type, startIcon, endIcon, sx, disabled, loading, sxText }: Props) => {
  return (
    <StyledButtonContainer
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
        <AppLoader />
      ) : (
        <StyledButtonText
          sx={{
            ...sxText,
          }}
        >
          {text}
        </StyledButtonText>
      )}
    </StyledButtonContainer>
  );
};

export default CustomButton;
