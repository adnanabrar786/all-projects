import { Chip, MenuItem, Select, SelectChangeEvent, SxProps, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { memo } from 'react';

type Props<TList> = {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  list: TList[];
  value: string[];
  handleChange: (event: SelectChangeEvent<string[]>, child) => void;
  sx?: SxProps;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 200,
      borderRadius: '20px',
    },
  },
};

function MultiSelectDropdownComponent<TList extends { id?: string; label?: string }>({
  name,
  list,
  error,
  handleChange,
  disabled = false,
  value = [],
  label,
  sx,
}: Props<TList>) {
  return (
    <>
      <FormControl fullWidth>
        <Select
          disabled={disabled}
          multiple
          id={name}
          name={name}
          value={value}
          fullWidth={true}
          onChange={handleChange}
          error={Boolean(error)}
          labelId="demo-multiple-chip-label"
          MenuProps={MenuProps}
          sx={{
            fontSize: '0.688rem',
            borderRadius: '30px',
            height: '45px',
            '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { padding: '0px 14px' },
            ...sx,
          }}
          variant="outlined"
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select {label}</em>;
            }
            return selected.map((value) => <Chip key={value} label={value} />);
          }}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>Select {name}</em>
          </MenuItem>
          {list?.map((item) => (
            <MenuItem key={item.id} value={item.label} id={item.id}>
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

export const MultiSelectDropdown = memo(MultiSelectDropdownComponent);
