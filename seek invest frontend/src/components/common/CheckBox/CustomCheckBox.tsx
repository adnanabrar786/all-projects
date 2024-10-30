import { Checkbox, FormControlLabel, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import Image from "next/image";
import { SyntheticEvent } from "react";

interface Props {
  icon: string;
  checkedIcon: string;
  width?: number;
  height?: number;
  label?: string;
  onChange?: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  checked?: boolean;
  sxText?: SxProps;
  sxForm?: SxProps;
}

const CustomCheckBox = ({
  icon,
  checkedIcon,
  width = 20,
  height = 20,
  label,
  onChange,
  checked,
  sxText,
  sxForm,
}: Props) => {
  return (
    <>
      <FormControlLabel
        checked={checked}
        value={checked}
        onChange={onChange}
        sx={{
          padding: "1rem",
          "&.MuiFormControlLabel-root": { mr: "0" },
          ...sxForm,
        }}
        control={
          <Checkbox
            icon={
              <Image
                priority
                src={icon}
                alt={"icon"}
                width={width}
                height={height}
              />
            }
            checkedIcon={
              <Image
                priority
                src={checkedIcon}
                alt={"icon"}
                width={width}
                height={height}
              />
            }
          />
        }
        label={
          <TextXs
            text={label || ""}
            sx={{
              fontWeight: "500",
              color: "var(--text-primary)",
              lineHeight: "1.25rem",
              ...sxText,
            }}
          />
        }
      />
    </>
  );
};

export default CustomCheckBox;
