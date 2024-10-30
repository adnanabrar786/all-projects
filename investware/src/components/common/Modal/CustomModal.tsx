import { Breakpoint, Dialog, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  showModal: boolean;
  setShowModal: (showResetPassword: boolean) => void;
  children: ReactNode;
  sxStyle?: SxProps;
  sx?: SxProps;
  fullWidth?: boolean;
  maxWidth?: false | Breakpoint;
}

const CustomModal = ({ sx, children, showModal, setShowModal, fullWidth, maxWidth, sxStyle }: Props) => {
  return (
    <Dialog
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClose={() => setShowModal(false)}
      PaperProps={{
        sx: {
          border: '2px solid var(--gray-300)',
          borderRadius: '0.625rem',
          boxShadow: 'none',
          ...sx,
        },
      }}
      sx={sxStyle}
      open={showModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};

export default CustomModal;
