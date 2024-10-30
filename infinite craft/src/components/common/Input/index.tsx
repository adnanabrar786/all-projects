"use client";
import ShowIcon from "@/assets/icons/showIcon";
import { InputAdornment, SxProps, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";

type prop = {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  backgroundColor?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  helperText?: any;
  error?: any;
  sx?: SxProps;
};
export default function Input({
  placeholder,
  type = "text",
  disabled,
  backgroundColor,
  value,
  onChange,
  name,
  error,
  helperText,
  sx,
}: prop) {
  const [isPassword, setPassword] = useState(false);
  return (
    <TextField
      type={type == "password" ? (isPassword ? "text" : "password") : "text"}
      id="outlined-basic"
      placeholder={placeholder}
      fullWidth
      value={value}
      disabled={disabled}
      onChange={onChange}
      helperText={error ? helperText : ""}
      name={name}
      error={error}
      InputProps={{
        style: { color: "var(--lightwhite)", backgroundColor: backgroundColor },
        endAdornment: (
          <InputAdornment position="end">
            {/* {endIcon}  */}
            {type === "password" && (
              <ShowIcon onClick={() => setPassword(!isPassword)} />
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        // backgroundColor: Colors.WHITE,
        backgroundColor: "var(--white)",
        // border: `0.06rem solid var(--lightwhite)`,
        borderRadius: "10px",
        fieldset: { height: "3.938rem", borderRadius: "8px" },
        ...sx,
      }}
      variant="outlined"
    />
  );
}
