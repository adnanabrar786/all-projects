import { Stack, SxProps, TextField } from '@mui/material';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
interface Props {
  sx?: SxProps;
  sxTextField?: SxProps;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number;
  label?: string;
  id?: string;
  variant?: string;
  endAdornment?: ReactNode;
  onClick?: () => void;
  multiline?: boolean;
  rows?: number;
  name?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
}

const CustomInput = ({
  sx,
  onChange,
  value,
  label,
  endAdornment,
  onClick,
  multiline,
  rows,
  sxTextField,
  name,
  error,
  helperText,
  disabled,
  type,
}: Props) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        ...sx,
      }}
    >
      <TextField
        sx={{
          fieldSet: {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderWidth: '1px !important',
            color: 'rgba(0, 0, 0, 0.60)',
          },
          fontSize: '0.75rem',
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
              borderWidth: '2px',
            },
          },

          '& .MuiInputLabel-root': {
            color: error ? '#717171' : '#717171',
            '&.Mui-focused': {
              color: error ? '#717171' : '#2196f3',
            },
          },
          ...sxTextField,
        }}
        type={type}
        disabled={disabled}
        size="small"
        name={name}
        onChange={onChange}
        value={value}
        id="outlined-basic"
        label={label}
        variant="outlined"
        InputProps={{
          endAdornment: endAdornment,
        }}
        multiline={multiline}
        rows={rows}
        error={error}
        helperText={helperText}
      />
    </Stack>
  );
};

export default CustomInput;
