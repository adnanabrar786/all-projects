import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextLg from "components/common/Text/TextLg";
import FrameWorkAccordion from "components/ui/assessments/FinancialAssessment/FrameWork/FrameWorkAccordion";
import SelectedFrameworkComp from "components/ui/assessments/FinancialAssessment/FrameWork/SelectedFrameworkComp";
import Preference from "components/ui/assessments/FinancialAssessment/Preference";
import Topics from "components/ui/assessments/FinancialAssessment/Topics/Topics";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EFrameworkType } from "enums/framework";
import { IFramework } from "interfaces/assessment";

const { CUSTOM, CHILDREN, DIRECT } = EFrameworkType;

interface Props {
  frameworks: IFramework[];
  onClickPrev: () => void;
  onClickNext: () => void;
  loading: boolean;
  isFetchingPrevious: boolean;
  visibleQuestion: number;
  fhaHasClient: string;
  step: number;
  setStep: (value: number) => void;
  hasFrameworks: boolean;
  setHasFrameworks: (value: boolean) => void;
  selectedFrameWork: IFramework | null;
}

const FrameWork = ({
  frameworks,
  onClickPrev,
  onClickNext,
  loading,
  isFetchingPrevious,
  visibleQuestion,
  fhaHasClient,
  step,
  setStep,
  hasFrameworks,
  setHasFrameworks,
  selectedFrameWork,
}: Props) => {
  const { selectedTopics, setPreferenceModal } = useAssessmentContext();

  return (
    <>
      {step === 1 && (
        <Stack
          direction={"column"}
          sx={{
            display: "flex",

            paddingBottom: "1.5rem",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              gap: "0.25rem",
            }}
          >
            <TextLg
              text="Choose a pathway"
              sx={{
                fontSize: "3rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "3.75rem",
                letterSpacing: "-0.06rem",
              }}
            />
            {/* <TextXs
              sx={{
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "1.5rem",
              }}
              text="Choose a framework that best align with your values or make your own individual selections"
            /> */}
          </Stack>

          <FrameWorkAccordion
            allFrameworks={frameworks}
            setStep={setStep}
            setHasFrameworks={setHasFrameworks}
          />
        </Stack>
      )}

      {step === 2 && !selectedFrameWork && <Topics />}
      {step === 2 && hasFrameworks && selectedFrameWork && (
        <SelectedFrameworkComp
          selectedFramework={selectedFrameWork}
          setStep={setStep}
        />
      )}

      {step === 3 && <Preference />}

      {(!selectedFrameWork || step === 3) && (
        <Stack
          direction={"row"}
          sx={{
            marginTop: "2rem",

            gap: "1.5rem",
          }}
        >
          {(visibleQuestion > 1 || step !== 1) && (
            <FilledButton
              loading={isFetchingPrevious}
              disabled={loading || isFetchingPrevious}
              onClick={() => {
                if (step === 3) {
                  switch (selectedTopics[0].frameworkType) {
                    case CUSTOM:
                      setPreferenceModal(false);
                      setStep(2);
                      break;
                    case CHILDREN:
                      setHasFrameworks(true);
                      setStep(2);
                      break;
                    case DIRECT:
                      setHasFrameworks(true);
                      setStep(1);
                      break;

                    default:
                      setStep(step - 1);
                      break;
                  }
                } else if (step === 1) {
                  onClickPrev();
                } else {
                  setStep(step - 1);
                  setPreferenceModal(false);
                }
              }}
              secondary
              text="Previous step"
            />
          )}

          {step !== 1 && (
            <FilledButton
              loading={loading}
              disabled={
                selectedTopics.length === 0 || loading || isFetchingPrevious
              }
              onClick={() => {
                if (step === 3) {
                  onClickNext();
                } else {
                  setStep(step + 1);
                }
              }}
              text="Proceed"
            />
          )}
        </Stack>
      )}
    </>
  );
};

export default FrameWork;
