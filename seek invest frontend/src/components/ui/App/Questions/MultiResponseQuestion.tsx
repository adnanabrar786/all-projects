import { Stack, SxProps, TextField, Typography } from "@mui/material";
import CustomRadioButton from "components/common/RadioButton/CustomRadioButton";
import TextXs from "components/common/Text/TextXs";
import {
  circleLightGreyCheckboxIcon,
  pen,
  tickCheckboxCircleIcon,
} from "constants/images.routes";
import { IMultiResponse } from "interfaces/assessment";
import Image from "next/image";
import { ChangeEventHandler } from "react";

interface Props {
  multiResponseTextfield: string;
  multiResponseQuestion: IMultiResponse;
  isDefault: boolean;
  sx?: SxProps;
  onChangeTextfield: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  maxLength?: number;
  isChecked?: boolean;
  icon?: string;
  onFocusTextField?: () => void;
}

const MultiResponseQuestion = ({
  sx,
  isDefault,
  multiResponseQuestion,
  onChangeTextfield,
  multiResponseTextfield,
  maxLength,
  isChecked,
  icon,
  onFocusTextField,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "var(--background-color2)",
        borderRadius: "0.5rem",
        border: "1px solid var(--gray-200)",
        alignItems: "flex-start",
        ...sx,
      }}
    >
      <CustomRadioButton
        value={multiResponseQuestion.id}
        isChecked={isChecked}
        sxForm={{
          alignItems: "start",
          width: "100%",
          padding: "0.87rem 1rem",
          ".MuiTypography-root": { width: "100%" },
          "&.MuiFormControlLabel-root": { mr: "0" },
        }}
        label={
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"} sx={{ width: "100%" }}>
              <Stack
                sx={
                  icon
                    ? {}
                    : {
                        backgroundColor: "var(--background-color3)",
                        padding: "0.4rem",
                        borderRadius: "50%",
                        border: "4px solid var(--gray-600)",
                        height: "20px",
                        width: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                      }
                }
              >
                <Image
                  priority
                  src={icon ? icon : pen}
                  alt={"icon"}
                  width={icon ? 45 : 16}
                  height={icon ? 45 : 16}
                />
              </Stack>

              <Stack
                sx={{
                  marginLeft: "0.88rem",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "0.8125rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "2rem",
                    span: {
                      color: "var(--text-primary)",
                      fontWeight: "600",
                    },
                  }}
                >
                  <span> {multiResponseQuestion.question}</span>{" "}
                  {multiResponseQuestion.description}
                </Typography>

                {isDefault && (
                  <TextField
                    onFocus={onFocusTextField}
                    autoComplete="off"
                    value={multiResponseTextfield}
                    onChange={onChangeTextfield}
                    placeholder="Enter a goal..."
                    multiline
                    rows={4}
                    inputProps={{ maxLength: maxLength }}
                    sx={{
                      "input::placeholder": {
                        fontSize: "1rem",
                        color: "var(--text-secondary)",
                        opacity: "1",
                        fontStyle: "normal",
                        lineHeight: "1.5rem",
                        fontWeight: "400",
                      },

                      marginTop: "0.5rem",
                      "& .MuiOutlinedInput-root": {
                        width: "100%",
                        "& fieldset": {
                          borderRadius: "1rem",
                          border: "1px solid var(--gray-300)",
                        },
                        "&:hover fieldset": {
                          border: "1px solid var(--gray-300)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid var(--gray-300)",
                        },
                      },
                    }}
                  />
                )}

                <TextXs
                  sx={{
                    marginTop: "0.37rem",
                    lineHeight: "1.25rem",
                    color: "var(--text-secondary)",
                  }}
                  text={
                    isDefault
                      ? `${maxLength} character limit`
                      : multiResponseQuestion.default_response
                  }
                />
              </Stack>
            </Stack>

            {isChecked ? (
              <Image
                priority
                src={tickCheckboxCircleIcon}
                alt={"icon"}
                width={20}
                height={20}
              />
            ) : (
              <Image
                priority
                src={circleLightGreyCheckboxIcon}
                alt={"icon"}
                width={20}
                height={20}
              />
            )}
          </Stack>
        }
      />
    </Stack>
  );
};

export default MultiResponseQuestion;
