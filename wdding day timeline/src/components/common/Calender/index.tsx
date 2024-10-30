import { SxProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { SlCalender } from 'react-icons/sl';

type TProps = {
  error?: string;
  value: any;
  handleChange: any;
  sx?: SxProps;
};

export default function MaterialUIPickers({ error, value, handleChange, sx }: TProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        disablePast
        value={value}
        onChange={handleChange}
        inputFormat="DD MMMM YYYY"
        renderInput={(params) => (
          <TextField
            label="Click to select"
            {...params}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SlCalender color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="Click to select"
            sx={{
              ...sx,
              width: '100%',
              height: '79px !important',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12)',
                fieldset: {
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: 'gray',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gray',
                },
              },

              '& .MuiOutlinedInput-input': {
                padding: '0px 14px',
                height: '79px',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, -6px) scale(0.75)',
              },
              '& input::placeholder': {
                fontSize: '1rem',
                fontWeight: '600',
                lineHeight: '1.21rem',
              },
            }}
          />
        )}
      />
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </LocalizationProvider>
  );
}
