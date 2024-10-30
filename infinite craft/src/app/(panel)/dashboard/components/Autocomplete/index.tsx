"use client";
import {
  Autocomplete,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
} from "@mui/material";
import { JSX } from "react";

export default function AutocompleteComponent() {
  const renderFunc = (
    params: JSX.IntrinsicAttributes & {
      variant?: TextFieldVariants | undefined;
    } & Omit<
        FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
        "variant"
      >,
  ) => {
    return <TextField {...params} label="Movie" />;
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={["Movie X", "Movie Y", "Movie Z"]}
      sx={{ width: 300 }}
      renderInput={renderFunc}
    />
  );
}
