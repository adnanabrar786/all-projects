import { Stack } from "@mui/material";
import TextLg from "components/common/Text/TextLg";
import StarCard from "components/ui/assessments/FinancialAssessment/CustomQuestion/Card/StarCard";

interface Props {
  setDisable: (disalble: boolean) => void;
}

const StarQuestion = ({ setDisable }: Props) => {
  return (
    <Stack
      sx={{
        marginTop: "7rem",
      }}
    >
      <TextLg
        sx={{
          fontWeight: "400",
          lineHeight: "2rem",
          color: "var(--dark-blue)",
        }}
        text="How happy are you with this assessment?"
      />

      <Stack
        direction={"column"}
        sx={{
          marginTop: "1.5rem",
          width: "fit-content",
          gap: "0.37rem",
        }}
      >
        <StarCard setDisable={setDisable} />
      </Stack>
    </Stack>
  );
};

export default StarQuestion;
