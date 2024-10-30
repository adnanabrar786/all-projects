import { StyledInput } from '@/components/common/StyledCommons';
import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  placeHolder?: string;
  sx?: SxProps;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  placeholder?: string;
  label: string;
  type?: string;
  name?: string;
  endAdornment?: ReactNode;
  error?: boolean;
  helperText?: string | false | undefined;
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const Input = ({
  sx,
  value,
  placeholder,
  onChange,
  label,
  type = 'text',
  endAdornment,
  name,
  error,
  helperText,
  id,
  disabled,
  defaultValue,
}: Props) => {
  return (
    <>
      <StyledInput
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        variant="outlined"
        label={label}
        focused
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: endAdornment,
        }}
        autoComplete="off"
        sx={{
          ...sx,
        }}
      />
    </>
  );
};

export default Input;
