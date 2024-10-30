import { MenuItem, Select, SelectChangeEvent, SxProps, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ReactNode, memo } from 'react';

type Props<TList> = {
  name: string;
  list: TList[];
  label: string;
  error?: string;
  disabled?: boolean;
  sx?: SxProps;
  selected: string | number;
  defaultValue?: string | number;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

function DropdownComponent<TList extends { id?: string; label?: string }>({
  name,
  list,
  error,
  selected,
  defaultValue,
  handleChange,
  sx,
  disabled = false,
}: Props<TList>) {
  return (
    <>
      <FormControl
        fullWidth={true}
        sx={{
          '.MuiInputBase-root': {
            borderRadius: '60px',
            fieldset: {
              borderColor: '#EAEAEA',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              borderColor: '#EAEAEA',
            },
          },
          width: { lg: '100px', xs: '80px' },
          cursor: disabled ? '' : 'pointer',
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
          key={selected}
          disabled={disabled}
          name={name}
          value={`${selected}`}
          onChange={handleChange}
          error={Boolean(error)}
          defaultValue={defaultValue !== undefined ? `${defaultValue}` : undefined}
          sx={{
            border: 'none',
            color: '#000000 !important',
            fontWeight: '400',
            fontSize: '12px',
          }}
          labelId="demo-select-small-label"
          id="demo-select-small"
        >
          {list?.map((item, index) => (
            <MenuItem key={index} value={item.id} selected={item.id === selected}>
              {item.label ?? ''}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography color="#D14343" fontSize={12}>
          {error}
        </Typography>
      )}
    </>
  );
}

export const DurationDropDown = memo(DropdownComponent);
