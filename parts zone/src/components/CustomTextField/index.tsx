import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

interface Props {
  placeHolder: string;
  textType: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  error?: boolean;
}

const CustomTextField = ({
  placeHolder,
  textType,
  onChange,
  name,
  error,
  value,
}: Props) => {
  return (
    <>
      <TextField
        onChange={onChange}
        sx={{
          marginTop: "8px",
          backgroundColor: "var(--text-background)",
          borderRadius: "8px",
          fieldset: {
            border: error ? "1px solid var(--red)" : "none",
          },
          "& .MuiOutlinedInput-root": {
            "input::placeholder": {
              fontSize: { md: "16px", xs: "14px" },
              color: "var(--light-grey)",
              opacity: "1",
            },
          },
        }}
        value={value}
        name={name}
        type={textType}
        error={error}
        margin="normal"
        placeholder={placeHolder}
        InputProps={{
          style: {
            border: "none",
            outline: "none",
          },
        }}
      />
    </>
  );
};

export default CustomTextField;
