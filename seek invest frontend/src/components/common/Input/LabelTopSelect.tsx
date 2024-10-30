import {
  MenuItem,
  Stack,
  TextField,
  Typography,
  capitalize,
  styled,
} from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";
import { ChangeEventHandler } from "react";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid var(--gray-300, #D0D5DD)",
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      borderRadius: "0.5rem",
    },
    "&:hover fieldset": {
      borderColor: "var(--gray-300, #D0D5DD)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--gray-300, #D0D5DD)",
    },

    "input::placeholder": {
      fontSize: "1rem",
      color: "var(--color-text-text-secondary, #667085)",
      opacity: "1",
    },
  },
});

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
  helperText?: string;
  menuItems: Array<{ value: string; icon?: string }>;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const LabelTopSelect = ({
  name,
  label,
  placeholder,
  value,
  onChange,

  menuItems,
}: Props) => {
  return (
    <Stack sx={{ gap: "0.375rem" }}>
      <TextXs text={label} sx={{ fontWeight: "500" }} />
      <CustomTextField
        autoComplete="off"
        name={name}
        placeholder={placeholder}
        size="small"
        select
        value={value}
        onChange={onChange}
      >
        <MenuItem
          disabled
          value={"none"}
          sx={{
            backgroundColor: "white",
            display: "none",
          }}
        >
          <Typography sx={{ color: "var(--text-secondary)" }}>
            {placeholder}
          </Typography>
        </MenuItem>

        {menuItems.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            <Stack
              direction={"row"}
              sx={{ alignItems: "center", gap: "0.75rem" }}
            >
              {item.icon && (
                <Image
                  priority
                  src={item.icon}
                  alt={"icon"}
                  width={14}
                  height={14}
                />
              )}
              <Typography>{capitalize(item.value.toLowerCase())}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </CustomTextField>
    </Stack>
  );
};

export default LabelTopSelect;
