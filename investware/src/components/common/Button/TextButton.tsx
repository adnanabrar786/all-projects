import { Stack, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import { AppLoader } from '../AppLoader';
interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  sxText?: SxProps;
}

const TextButton = ({ text, onClick, type, sx, sxText, disabled, loading }: Props) => {
  return (
    <Button
      disableElevation
      disabled={disabled}
      type={type}
      onClick={onClick}
      sx={{
        ...sx,
      }}
    >
      {loading ? <AppLoader color="#1e88e5" /> : <Stack>{text}</Stack>}
    </Button>
  );
};

export default TextButton;
