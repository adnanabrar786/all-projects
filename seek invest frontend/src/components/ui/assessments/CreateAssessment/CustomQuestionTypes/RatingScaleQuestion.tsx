import { Grid } from "@mui/material";
import LabelTopSelect from "components/common/Input/LabelTopSelect";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import {
  HashIcon,
  SmileyOutlinedIcon,
  StarOutlinedIcon,
} from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { ERatingTypes } from "enums/enums";
import { ChangeEvent, useState } from "react";

interface Props {
  index: number;
}

const RatingScaleQuestion = ({ index }: Props) => {
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();

  const [formData, setFormData] = useState({
    scale: "none",
    range: "5 points",
    lowerLabel: "",
    upperLabel: "",
  });

  const textFields = [
    {
      name: "scale",
      value: customQuestions[index].ratings?.rating_type || "none",
      label: "Scale",
      placeholder: "# Number (recommended)",
      dropDownArr: [
        { value: ERatingTypes.NUMBER, icon: HashIcon },
        { value: ERatingTypes.STAR, icon: StarOutlinedIcon },
        { value: ERatingTypes.SMILEY, icon: SmileyOutlinedIcon },
      ],
    },
    {
      name: "range",
      value: formData.range,
      label: "Range",
      disable: true,
      placeholder: "5 points",
    },
    {
      name: "lowerLabel",
      value: customQuestions[index].ratings?.start_value_label || "",
      label: "Lower Label",
      placeholder: "Very dissatisfied",
    },
    {
      name: "upperLabel",
      value: customQuestions[index].ratings?.end_value_label || "",
      label: "Upper Label",
      placeholder: "Very Satisfied",
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "scale") {
      handleRatingTypeChange(value);
    }

    if (name === "lowerLabel") {
      handleLowerLabelChange(value);
    }

    if (name === "upperLabel") {
      handleEndLabelChange(value);
    }
  };

  const handleRatingTypeChange = (value) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].ratings.rating_type = value;
    updateCustomQuestions(tempCustomQuestions);
  };

  const handleLowerLabelChange = (value) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].ratings.start_value_label = value;
    updateCustomQuestions(tempCustomQuestions);
  };

  const handleEndLabelChange = (value) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].ratings.end_value_label = value;
    updateCustomQuestions(tempCustomQuestions);
  };

  return (
    <Grid container sx={{ marginTop: "1rem" }} spacing={3}>
      {textFields.map((textField, gridIndex) => (
        <Grid key={gridIndex} item md={6}>
          {textField.dropDownArr ? (
            <LabelTopSelect
              label={textField.label}
              name={textField.name}
              menuItems={textField.dropDownArr}
              placeholder={textField.placeholder}
              value={textField.value}
              onChange={handleChange}
            />
          ) : (
            <LabelTopTextField
              disabled={textField.name === "range"}
              sxContainer={{
                display:
                  (customQuestions[index].ratings?.rating_type ===
                    ERatingTypes.STAR ||
                    customQuestions[index].ratings?.rating_type ===
                      ERatingTypes.SMILEY) &&
                  (textField.name === "lowerLabel" ||
                    textField.name === "upperLabel")
                    ? "none"
                    : "",
              }}
              sx={{
                "& .MuiOutlinedInput-root":
                  textField.name === "range"
                    ? {
                        backgroundColor: "var(--gray-100)",
                      }
                    : {},
              }}
              label={textField.label}
              name={textField.name}
              placeholder={textField.placeholder}
              value={textField.value}
              onChange={handleChange}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default RatingScaleQuestion;
