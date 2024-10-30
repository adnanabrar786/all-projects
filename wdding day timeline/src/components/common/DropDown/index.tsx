import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ReactNode, memo } from 'react';

type Props<TList> = {
  name: string;
  list: TList[];
  label: string;
  error?: string;
  disabled?: boolean;
  selected: string | number;
  defaultValue?: string | number;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 200,
      borderRadius: '20px',
    },
  },
};

function DropdownComponent<TList extends { id?: string; label?: string }>({
  name,
  list,
  error,
  selected,
  defaultValue,
  handleChange,
  disabled = false,
}: Props<TList>) {
  return (
    <>
      <FormControl fullWidth>
        <Select
          disabled={disabled}
          id={name}
          name={name}
          value={`${selected}`}
          fullWidth={true}
          MenuProps={MenuProps}
          onChange={handleChange}
          error={Boolean(error)}
          labelId="demo-simple-select-label"
          defaultValue={defaultValue !== undefined ? `${defaultValue}` : undefined}
          sx={{
            fontSize: { xs: '0.688rem', xl: '0.75rem' },
            borderRadius: '30px',
            height: { xs: '42px', xl: '45px' },
            fontFamily: 'Poppins',
            width: '100%',
            '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { padding: '0px 14px' },
          }}
          variant="outlined"
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

export const Dropdown = memo(DropdownComponent);
