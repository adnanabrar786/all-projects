import { FormControl, MenuItem, Select, SxProps } from '@mui/material';
import { ElementType } from 'react';

interface Props {
  value: string;
  onChange: (event: any) => void;
  IconComponent: ElementType<any>;
  list?: any[];
  sx?: SxProps;
  placeholder?: string;
  error?: any;
  isPinned?: boolean;
}

const DateDropDown = ({ value, onChange, IconComponent, list = [], sx, placeholder, error, isPinned }: Props) => {
  return (
    <>
      <FormControl
        sx={{
          '.MuiInputBase-root': {
            borderRadius: '60px',
            '&.Mui-focused fieldset': {
              border: 'none',
              outline: 'none',
            },
            '&:hover fieldset': {
              borderColor: '#EAEAEA',
            },
          },
          width: { lg: '100px', xs: '80px' },
          cursor: isPinned ? '' : 'pointer',
          backgroundColor: '#ffffff',
          borderRadius: '60px',
          '.MuiSvgIcon-root': {
            color: '#C4C4C4',
          },
          ...sx,
        }}
        size="small"
      >
        <Select
          sx={{
            border: 'none',
            outline: 'none',
            color: '#000000 !important',
            fontWeight: '400',
            fontSize: '12px',
          }}
          disabled={isPinned}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          onChange={onChange}
          displayEmpty
          IconComponent={IconComponent}
          renderValue={(selectedValue) => {
            if (selectedValue) {
              return selectedValue;
            }
            return (
              <div
                style={{
                  color: '#B0B0B0',
                }}
              >
                {placeholder}
              </div>
            );
          }}
        >
          {list.map((item, index) => (
            <MenuItem key={index} sx={{ color: 'black' }} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </>
  );
};

export default DateDropDown;
