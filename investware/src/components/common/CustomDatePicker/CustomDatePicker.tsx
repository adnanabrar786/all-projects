import { Calender } from '@/constants/images.routes';
import { InputAdornment, Stack, SxProps } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

interface Props {
  sx?: SxProps;
  onChange: (date: Dayjs | null) => void;
  value: dayjs.Dayjs | null;
  label: string;
  name?: string;
  customIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
  sxDatePicker?: SxProps;
  disabled?: boolean;
  hideCalender?: boolean;
}

export default function CustomDatePicker({
  sx,
  onChange,
  value,
  label,
  name,
  customIcon,
  error,
  helperText,
  sxDatePicker,
  disabled,
  hideCalender,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Stack
      sx={{
        ...sx,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="MM/DD/YYYY"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          onAccept={() => setOpen(false)}
          onError={() => setOpen(true)}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23) !important',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(0, 0, 0, 0.60)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2196f3 !important',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3 !important',
              borderWidth: '1px !important',
              color: '#2196f3',
            },
            ...sxDatePicker,
          }}
          slotProps={{
            textField: {
              size: 'small',
              error,
              helperText,
              onBlur: (e) => {
                if (!e.target.value) {
                  onChange(null);
                }
              },
              onClick: () => {
                if (!disabled) {
                  setOpen(true);
                }
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction={'row'} sx={{ alignItems: 'center', gap: '0.75rem' }}>
                      {customIcon && (
                        <Stack
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          {customIcon}
                        </Stack>
                      )}

                      <Stack
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        <Image priority src={Calender} alt={'icon'} width={20} height={20} />
                      </Stack>
                    </Stack>
                  </InputAdornment>
                ),
              },
            },
          }}
          label={label}
          name={name}
        />
      </LocalizationProvider>
    </Stack>
  );
}
