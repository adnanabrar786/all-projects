import { Stack, TextField } from "@mui/material";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import {
  CheckIcon,
  CircleCheckFilledIcon,
  CircleOutlinedIcon,
} from "constants/images.routes";
import Image from "next/image";
import { useState } from "react";

interface TextAreaProps {
  placeholder: string;
}

export const TextArea = ({ placeholder }: TextAreaProps) => {
  return (
    <TextField
      autoComplete="off"
      sx={{
        mt: "0.36rem",
        fontSize: "0.60231rem",
        input: {
          fontSize: "0.60231rem",
          height: "0.25rem",
        },
        "input::placeholder": {
          fontSize: "0.60231rem",
          color: "var(--color-text-text-secondary, #667085)",
          opacity: "1",
        },
      }}
      placeholder={placeholder}
    />
  );
};

interface CheckBoxesProps {
  checkBoxesArr: string[];
}
export const CheckBoxes = ({ checkBoxesArr }: CheckBoxesProps) => {
  const [selectedCheckBox, setSelectedCheckBox] = useState("");
  return (
    <Stack sx={{ mt: "0.36rem" }}>
      {checkBoxesArr.map((checkBox, index) => (
        <Stack
          key={index}
          onClick={() => setSelectedCheckBox(checkBox)}
          direction={"row"}
          sx={{
            padding: "0.02956rem 0.5rem",
            alignItems: "center",
            border: "0.33px solid var(--gray-200, #EAECF0)",
            borderRadius: "0.16481rem",
            cursor: "pointer",
            gap: "0.25rem",
          }}
        >
          <Image
            priority
            src={
              checkBox === selectedCheckBox
                ? CircleCheckFilledIcon
                : CircleOutlinedIcon
            }
            alt={"icon"}
            width={8}
            height={8}
          />
          <TextXs text={checkBox} sx={{ fontSize: "0.51725rem" }} />
        </Stack>
      ))}
    </Stack>
  );
};

export const YesNo = () => {
  return (
    <Stack direction={"row"} sx={{ marginTop: "0.63rem" }}>
      <IconText
        sxRow={{
          padding: "0 0.52rem",
          border: "0.518px solid var(--border-color)",
          borderRadius: "0.25906rem 0rem 0rem 0.25906rem",
        }}
        sxText={{ fontSize: "0.65rem" }}
        iconWidth={11}
        iconHeight={11}
        text="Agree"
        icon={CheckIcon}
      />
      <IconText
        sxRow={{
          padding: "0 0.52rem",
          border: "0.518px solid var(--border-color)",
          borderRadius: "0rem 0.25906rem 0.25906rem 0rem",
        }}
        sxText={{ fontSize: "0.65rem" }}
        iconWidth={11}
        iconHeight={11}
        text="Disagree"
        icon={CheckIcon}
      />
    </Stack>
  );
};

export const DisagreeAgree = () => {
  return (
    <Stack sx={{ marginTop: "0.44rem" }}>
      <Stack
        direction={"row"}
        sx={{
          border: "0.475px solid var(--border-color)",
          borderRadius: "0.23731rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {[1, 2, 3, 4, 5].map((number, index) => (
          <TextXs
            key={index}
            text={number.toString()}
            sx={{
              fontSize: "0.65rem",
              padding: "0.3rem 0.47rem",
              width: "100%",
              textAlign: "center",
              borderRight:
                number === 5 ? "none" : "0.475px solid var(--border-color)",
            }}
          />
        ))}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <TextXs
          text={"Strongly disagree"}
          sx={{
            fontSize: "0.5rem",
            fontWeight: "600",
          }}
        />
        <TextXs
          text={"Strongly agree"}
          sx={{
            fontSize: "0.5rem",
            fontWeight: "600",
          }}
        />
      </Stack>
    </Stack>
  );
};
