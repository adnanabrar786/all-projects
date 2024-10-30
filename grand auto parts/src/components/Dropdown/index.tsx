import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { memo } from "react";

type Props = {
  name: string;
  label: string;
  error?: string;
  selected?: string;
  disabled?: boolean;
  list: string[];
  handleChange?: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
};

function DropdownComponent({
  name,
  list,
  label,
  selected,
  error,
  disabled = false,
  handleChange,
}: Props) {
  return (
    <Box sx={{ my: 2, width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          disabled={disabled}
          id={name}
          name={name}
          label={label}
          value={selected}
          defaultValue={selected || ""}
          onChange={handleChange}
          error={Boolean(error)}
          labelId="demo-simple-select-label"
        >
          {list.map((item, index) => (
            <MenuItem key={index} value={item} selected={item === selected}>
              {item ?? ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography color="#D14343" fontSize={12}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export const Dropdown = memo(DropdownComponent);
