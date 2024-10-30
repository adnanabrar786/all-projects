import { IconButton, SxProps } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import { useState } from 'react';

type TProps = {
  error?: string;
  value: any;
  handleChange: any;
  onDone: any;
  sx?: SxProps;
};

export default function CustomDatePicker({ error, value, handleChange, sx, onDone }: TProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <IconButton onClick={handleOpen} sx={sx}>
        <Image src="/images/dashboard/pencil.svg" alt="" width={13} height={13} />
      </IconButton>
      <MobileDatePicker
        disablePast
        value={value}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
        onAccept={onDone}
        inputFormat="DD MMMM YYYY"
        open={open}
        onClose={handleClose}
        renderInput={() => <></>}
      />
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </LocalizationProvider>
  );
}
