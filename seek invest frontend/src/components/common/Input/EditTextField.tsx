import { SxProps, TextField } from "@mui/material";
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  ReactNode,
} from "react";

interface Props {
  value?: string;
  defaultValue?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onPressEnter?: KeyboardEventHandler<HTMLDivElement>;
  placeholder?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  type?: HTMLInputTypeAttribute;
  sx?: SxProps;
  autoFocus?: boolean;
}

const EditTextField = ({
  value,
  defaultValue,
  onChange,
  onPressEnter,
  placeholder,
  startAdornment,
  endAdornment,
  type,
  sx,
  autoFocus = true,
}: Props) => {
  return (
    <TextField
      defaultValue={defaultValue}
      autoComplete="off"
      type={type}
      autoFocus={autoFocus}
      variant="outlined"
      value={value}
      placeholder={placeholder}
      onKeyDown={onPressEnter}
      onChange={onChange}
      sx={{
        color: "var(--text-secondary)",

        input: {
          height: "auto",
          paddingY: "0",
          fontSize: "0.8125rem",
          fontWeight: "400",
          fontStyle: "normal",
        },

        ...sx,
      }}
      InputProps={{
        startAdornment,
        endAdornment,
      }}
    />
  );
};

export default EditTextField;
