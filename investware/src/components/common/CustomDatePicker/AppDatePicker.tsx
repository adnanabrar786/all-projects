import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Props {
  value: any;
  setValue?: (value: any) => void;
  onChange?: (rowIdx: any, valIdx: any, value: any) => void;
}

export default function AppDatePicker({ value, setValue, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiTypography-root': {
            color: 'var(--black)',
            fontWeight: '500',
          },
        }}
      />
    </LocalizationProvider>
  );
}
