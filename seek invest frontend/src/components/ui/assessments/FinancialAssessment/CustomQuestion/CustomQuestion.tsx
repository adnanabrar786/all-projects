import { Box } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import EmojiQuestion from "components/ui/assessments/FinancialAssessment/CustomQuestion/EmojiQuestion";
import NumberQuestion from "components/ui/assessments/FinancialAssessment/CustomQuestion/NumberQuestion";
import StarQuestion from "components/ui/assessments/FinancialAssessment/CustomQuestion/StarQuestion";
import FinancialLayout from "components/ui/layouts/FinancialLayout";
import { EFINANCIALLAYOUTTITLE } from "enums/enums";
import { useEffect, useState } from "react";

const CustomQuestion = () => {
  const [selectedIndex, setselectedIndex] = useState<number>();
  const [currentComponent, setCurrentComponent] = useState<number>(1);
  const [disalble, setDisable] = useState<Boolean | undefined>(false);
  const [value, setValue] = useState<number>(0);

  const handleButtonClick = () => {
    setCurrentComponent((prevComponent) => Math.min(3, prevComponent + 1));
    setselectedIndex(undefined);
    setDisable(false);
  };

  useEffect(() => {
    if (currentComponent === 1) {
      setValue(25);
    }
    if (currentComponent === 2) {
      setValue(60);
    }
    if (currentComponent === 3) {
      setValue(100);
    }
  }, [currentComponent]);

  return (
    <FinancialLayout title={EFINANCIALLAYOUTTITLE.VALUE_TITLE} value={value}>
      {currentComponent === 1 && <NumberQuestion />}

      {currentComponent === 2 && <EmojiQuestion />}

      {currentComponent === 3 && <StarQuestion setDisable={setDisable} />}

      <Box
        sx={{
          marginTop: "2.38rem",
        }}
      >
        <FilledButton
          onClick={handleButtonClick}
          disabled={!disalble}
          text="Proceed"
        />
      </Box>
    </FinancialLayout>
  );
};

export default CustomQuestion;
