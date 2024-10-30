import React from 'react';
import { SxProps } from '@mui/material';
import MUIButton from '@mui/material/Button'; // Make sure to import the MUI Button

interface CustomButtonProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  type?: any;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, sx, onClick, type, disabled }) => {
  return (
    <MUIButton
      disableRipple
      disabled={disabled}
      type={type ? type : 'submit'}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#ffff',
        width: '100%',
        border: '1px solid #00CAA5',
        borderRadius: '16px',
        height: '44px',
        color: '#00CAA5',
        fontWeight: '500',
        textTransform: 'initial',
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};

export default CustomButton;
