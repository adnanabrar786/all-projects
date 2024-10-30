import { SxProps, TextField } from '@mui/material';

// type Props = TextFieldProps & {
//   name?: string;
//   placeholder?: string;
//   className?: string;
//   error?: boolean;
//   type?: string;
//   label?: string;
//   labelStyle?: string;
//   isImportant?: boolean;
//   sx?: SxProps;
// };

type Props = {
  name?: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
  type?: string;
  label?: string;
  labelStyle?: string;
  isImportant?: boolean;
  sx?: SxProps;
  [key: string]: any;
};

export default function Input({
  className,
  name,
  error,
  helperText,
  placeholder,
  disabled,
  type,
  label,
  labelStyle,
  sx,
  isImportant = true,
  ...rest
}: Props) {
  return (
    <>
      <span className={`text-w_xs1 xl:text-sm text-gray-700 font-medium ${labelStyle}`}>
        {label !== undefined ? label + (isImportant && ' *') : ''}
      </span>
      <TextField
        hiddenLabel
        name={name}
        helperText={helperText}
        disabled={disabled}
        error={Boolean(error)}
        variant="outlined"
        type={type || 'text'}
        fullWidth={true}
        autoComplete="off"
        autoCorrect="off"
        sx={{
          fontFamily: 'Poppins',
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
          },
          [`& fieldset`]: {
            borderRadius: 35,
            border: '1px solid gray',
          },
          '& [type]:focus': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '35px !important',
          },
          '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
            borderRadius: '35px !important',
            fontSize: { xs: '0.688rem !important', xl: '0.75rem !important' },
            fontFamily: 'Poppins, sans',
          },
          [`& fieldset:focus`]: {
            boxShadow: 'none',
          },
          '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
            padding: '13.5px 14px',
          },
          '& .MuiInputBase-root': {
            height: '42px',
            fontSize: { xs: '0.688rem !important', xl: '16px !important' },
          },
          height: '42px',
          fontSize: { xs: '0.688rem !important', xl: '16px !important' },
          ...sx,
        }}
        className={className}
        InputProps={{
          inputProps:
            type === 'number'
              ? {
                  min: 0,
                }
              : undefined,
          inputMode: type === 'number' ? 'numeric' : 'text',
          autoComplete: 'off',
        }}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
}
