import { TextFieldProps, Typography } from '@mui/material';
import classNames from 'classnames';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type Props = TextFieldProps & {
  placeholder?: string;
  className?: unknown;
  error?: unknown;
  type?: unknown;
  data?: string[];
  value: string;
  disable?: boolean;
  helperText?: string | boolean;
  handleChange: (value: string | undefined) => void;
  handleBlur: (e) => void;
  borderColor1?: string;
  borderColor2?: string;
  backgroundColor?: string;
  errorText?: boolean;
  numberInputProps?: object;
  autoComplete?: string;
};

export const handlePhoneInputHelperText = (submit, value) => {
  if (submit) {
    if (value?.length) {
      if (isValidPhoneNumber(value)) {
        return false;
      } else return 'Enter valid number';
    } else return 'Required';
  }
};

export const handlePhoneInputHelperTextValidNumber = (submit, value) => {
  if (submit) {
    if (value?.length) {
      if (isValidPhoneNumber(value)) {
        return false;
      } else return 'Enter valid number';
    }
  }
};
export const handlePhoneInputError = (submit, value) => {
  if (submit) {
    if (value?.length) {
      if (isValidPhoneNumber(value)) {
        return false;
      } else return true;
    } else return true;
  }
};

export const handleValidNumberError = (submit, value) => {
  if (submit) {
    if (value?.length) {
      if (isValidPhoneNumber(value)) {
        return false;
      } else return true;
    }
  }
};

export default function PhoneNumberInput({
  name,
  error,
  value,
  handleChange,
  handleBlur,
  disabled,
  helperText,
  placeholder,
  borderColor1 = '#aaaaaa',
  borderColor2 = 'gray',
  backgroundColor = 'transparent',
  errorText,
  numberInputProps,
  autoComplete,
}: Props) {
  return (
    <>
      <Typography component="div" sx={{ fontSize: { xs: '0.688rem', xl: '0.9rem' } }}>
        <PhoneInput
          autoComplete={autoComplete}
          sx={{ boxShadow: 'transparent !important' }}
          defaultCountry="US"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          style={{ backgroundColor: backgroundColor }}
          numberInputProps={{
            style: {
              paddingLeft: '10px',
              border: 'none',
              marginTop: 3,
              marginRight: 0,
              marginLeft: '-10px',
              outlineWidth: 0,
              backgroundColor: 'transparent',
              opacity: disabled ? '0.2' : '1',
              '.& [type="tel"]:focus': {
                outline: 'none !important',
                border: 'none !important',
                boxShadow: 'transparent !important',
              },
            },
            ...numberInputProps,
          }}
          className={classNames({
            'p-[10px] pl-[18px] h-[43px] rounded-full border border-solid ': true,
            [`border-[${borderColor1}]`]: disabled,
            'border-[red]': error && !disabled,
            [`border-[${borderColor2}]`]: !error && !disabled,
          })}
          onBlur={(e) => handleBlur(e)}
          disabled={disabled}
        />
      </Typography>
      <div>
        {!errorText ? (
          <p
            style={{
              color: '#D32F2F',
              fontSize: '12px',
              marginTop: '3px',
              marginLeft: '14px',
              fontWeight: '500',
            }}
          >
            {helperText}
          </p>
        ) : (
          <Typography
            sx={{
              color: '#FF0000',
              marginLeft: '15px',
              fontSize: '13px',
              fontWeight: '400',
              fontFamily: 'Poppins',
            }}
          >
            {helperText}
          </Typography>
        )}
      </div>
    </>
  );
}
