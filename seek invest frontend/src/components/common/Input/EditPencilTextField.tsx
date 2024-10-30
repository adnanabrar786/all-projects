import { Stack, TextField } from "@mui/material";
import { EditPencilLineIcon } from "constants/images.routes";
import Image from "next/image";
import React from "react";

interface Props {
  value: string;
  placeholder: string;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const EditPencilTextField = ({
  value,
  placeholder,
  onBlur,
  onKeyDown,
  onChange,
}: Props) => {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }}>
      <TextField
        autoComplete="off"
        autoFocus={true}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={onChange}
        sx={{
          fieldset: {
            border: "none",
          },
          input: {
            fontSize: "1.125rem",
            fontWeight: "700",
            width: "10rem",
            padding: "0",
          },
        }}
      />
      <Image
        priority
        src={EditPencilLineIcon}
        alt={"icon"}
        width={20}
        height={20}
      />
    </Stack>
  );
};

export default EditPencilTextField;
