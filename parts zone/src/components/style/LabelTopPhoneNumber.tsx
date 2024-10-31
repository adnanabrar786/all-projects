import {
  Box,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";

interface Props {
  label?: string;
  phoneNo: string;
  error?: boolean;
  hideCountryCode?: boolean;
  helperText?: string;
  onChange: (e: any) => void;
  fontSize?: string;
  sx?: SxProps;
  boxSx?: SxProps;
  menuSx?: SxProps;
}
const LabelTopPhoneNumber = ({
  label,
  phoneNo,
  error,
  hideCountryCode,
  helperText,
  onChange,
  fontSize = "1rem",
  sx,
  boxSx,
  menuSx,
}: Props) => {
  const [countryCode, setCountryCode] = useState("1");
  const [countryInitial, setCountryInitial] = useState("US");

  const handleCountryChange = (e) => {
    if (e) {
      setCountryInitial(e);
      setCountryCode("");
    }
  };

  const handleCountrySelectChange = (event) => {
    const selectedCountry = event.target.value;
    const callingCode = getCountryCallingCode(selectedCountry);
    setCountryCode(callingCode);
    setCountryInitial(selectedCountry);
    onChange(`+${callingCode}`);
  };

  const handleChange = (e) => {
    if (e && e.startsWith("+1")) {
      setCountryInitial("US");
    }

    onChange(e);
  };

  return (
    <Stack sx={{ gap: "0.375rem" }}>
      <Box
        sx={{
          backgroundColor: "var(--text-background)",
          borderRadius: "0.5rem",
          padding: "0.4375rem 0rem",
          ...boxSx,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            height: "2.5rem",

            ...sx,
            ".PhoneInput": {
              width: "100%",
              height: "100%",
              border: "none !important",
              input: {
                border: "none !important",
                height: "100%",
                backgroundColor: "transparent",
                outline: "none",
                fontSize: fontSize,
                color: "var(--text-primary)",
              },
            },
          }}
        >
          <PhoneInput
            value={phoneNo || `+${countryCode}`}
            limitMaxLength
            focusInputOnCountrySelection
            placeholder={`+${countryCode}`}
            onCountryChange={handleCountryChange}
            countrySelectComponent={() =>
              !hideCountryCode ? (
                <TextField
                  autoComplete="off"
                  size="small"
                  select
                  value={countryInitial}
                  sx={{ fieldset: { border: "none" } }}
                  onChange={handleCountrySelectChange}
                >
                  {getCountries().map((country) => (
                    <MenuItem
                      key={country}
                      value={country}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography sx={{ width: "2rem", ...menuSx }}>
                        {country}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              ) : null
            }
            onChange={handleChange}
          />
        </Stack>
      </Box>

      {error && (
        <Typography
          sx={{
            color: "var(--red)",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "1.66",
            marginX: "14px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Stack>
  );
};

export default LabelTopPhoneNumber;
