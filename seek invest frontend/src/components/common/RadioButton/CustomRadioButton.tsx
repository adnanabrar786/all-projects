import { FormControlLabel, Radio, SxProps } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  icon?: string;
  checkedIcon?: string;
  width?: number;
  height?: number;
  label?: ReactNode;
  value: string | number;
  isChecked?: boolean;
  sxForm?: SxProps;
  sxRadio?: SxProps;
}

const CustomRadioButton = ({
  icon,
  checkedIcon,
  width = 20,
  height = 20,
  label,
  value,
  isChecked,
  sxForm,
  sxRadio,
}: Props) => {
  return (
    <FormControlLabel
      checked={isChecked}
      value={value}
      sx={sxForm}
      control={
        <Radio
          sx={sxRadio}
          icon={
            icon ? (
              <Image
                priority
                src={icon}
                alt={"icon"}
                width={width}
                height={height}
              />
            ) : (
              <></>
            )
          }
          checkedIcon={
            checkedIcon ? (
              <Image
                priority
                src={checkedIcon}
                alt={"icon"}
                width={width}
                height={height}
              />
            ) : (
              <></>
            )
          }
        />
      }
      label={label}
    />
  );
};

export default CustomRadioButton;
