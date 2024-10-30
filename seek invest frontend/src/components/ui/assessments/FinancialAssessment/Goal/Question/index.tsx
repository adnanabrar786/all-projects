import { Stack, Typography } from "@mui/material";
import CustomCheckBox from "components/common/CheckBox/CustomCheckBox";
import { goalQuestion } from "constants/data";
import {
  circleLightGreyCheckboxIcon,
  tickCheckboxCircleIcon,
} from "constants/images.routes";

const Question = () => {
  return (
    <>
      <Stack
        sx={{
          maxWidth: "736px",
        }}
      >
        <Typography
          sx={{
            color: "var(--text-grey)",
            fontSize: "1.5rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "2rem",
            span: {
              color: "var(--primary)",
            },
          }}
        >
          Given your current financial situation, which of the following
          describes your need to take risk with your finances,
          <span> in order to accomplish your primary goal?</span>
        </Typography>

        <Stack
          sx={{
            marginTop: "1.5rem",
            gap: "0.75rem",
          }}
        >
          {goalQuestion.map((val, index) => (
            <Stack
              key={index}
              sx={{
                backgroundColor: "var(--background-color2)",
                borderRadius: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--gray-200)",
              }}
            >
              <CustomCheckBox
                checkedIcon={tickCheckboxCircleIcon}
                icon={circleLightGreyCheckboxIcon}
                label={val}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Question;
