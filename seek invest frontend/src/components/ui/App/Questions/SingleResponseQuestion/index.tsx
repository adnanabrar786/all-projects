import { Stack } from "@mui/material";
import CustomRadioButton from "components/common/RadioButton/CustomRadioButton";
import TextXs from "components/common/Text/TextXs";
import {
  circleLightGreyCheckboxIcon,
  tickCheckboxCircleIcon,
} from "constants/images.routes";
import { OPTION_ORIENTATIONS } from "enums/enums";
import { Options } from "interfaces/assessment";

interface Props {
  value: string | number;
  options: Options[];
}

const SingleResponseQuestion = ({ options, value }: Props) => {
  const orientation = options[0].orientation;

  const renderOptions = () => {
    if (orientation === OPTION_ORIENTATIONS.VERTICAL)
      return options.map((option, index) => (
        <Stack
          key={index}
          sx={{
            backgroundColor: "var(--background-color2)",
            borderRadius: "0.5rem",
            border: "1px solid var(--gray-200)",
          }}
        >
          <CustomRadioButton
            isChecked={value === option.id?.toString()}
            checkedIcon={tickCheckboxCircleIcon}
            icon={circleLightGreyCheckboxIcon}
            sxForm={{
              padding: "1rem",
              "&.MuiFormControlLabel-root": { mr: "0" },
            }}
            label={
              <TextXs
                text={option.text || ""}
                sx={{
                  fontWeight: "500",
                  color: "var(--text-primary)",
                  lineHeight: "1.25rem",
                }}
              />
            }
            value={option.id ? option.id : ""}
          />
        </Stack>
      ));

    if (orientation === OPTION_ORIENTATIONS.HORIZONTAL)
      return options.map((option, index) => (
        <Stack
          key={index}
          sx={{
            backgroundColor: "var(--background-color2)",
            borderRadius: "0.5rem",
            border: "1px solid var(--gray-200)",
            width: "11.375rem",
            position: "relative",
            minHeight: "13.4375rem",
            ".selectable_container": {
              marginTop: "2rem",
            },
          }}
        >
          <CustomRadioButton
            isChecked={value === option.id?.toString()}
            checkedIcon={tickCheckboxCircleIcon}
            icon={circleLightGreyCheckboxIcon}
            sxForm={{
              padding: "1rem",
              flexDirection: "column",
              alignItems: "start",
              "&.MuiFormControlLabel-root": {
                mr: "0",
                ml: "0",
                height: "100%",
              },
            }}
            sxRadio={{
              alignSelf: "flex-end",
              padding: "0",
              position: "absolute",
              right: "0.63rem",
              top: "0.75rem",
            }}
            label={
              <Stack
                dangerouslySetInnerHTML={{
                  __html: option.styled_text ?? "",
                }}
              />
            }
            value={option.id ? option.id : ""}
          />
        </Stack>
      ));
  };

  return (
    <Stack
      direction={
        orientation === OPTION_ORIENTATIONS.HORIZONTAL ? "row" : "column"
      }
      sx={{
        marginTop: "1.5rem",
        gap:
          orientation === OPTION_ORIENTATIONS.HORIZONTAL
            ? "1.56rem"
            : "0.75rem",
      }}
    >
      {renderOptions()}
    </Stack>
  );
};

export default SingleResponseQuestion;
