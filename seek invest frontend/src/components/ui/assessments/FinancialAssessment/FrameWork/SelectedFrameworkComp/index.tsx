import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import CustomDivider from "components/common/Divider/CustomDivider";
import TextXs from "components/common/Text/TextXs";
import Header from "components/ui/assessments/FinancialAssessment/FrameWork/SelectedFrameworkComp/Header";
import { GreyCircle, TickBlueCircle } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EFrameworkType } from "enums/framework";
import { IFramework } from "interfaces/assessment";
import Image from "next/image";
import { frameworkChildren } from "services/assessment.services";
import { toastError } from "utils/toaster";

const { CHILDREN } = EFrameworkType;

interface Props {
  selectedFramework: IFramework | null;
  setStep: (step: number) => void;
}

const SelectedFrameworkComp = ({ selectedFramework, setStep }: Props) => {
  const {
    setSelectedTopics,
    selectedFrameworkChildIds,
    setSelectedFrameworkChildIds,
    selectedFrameWorkId,
  } = useAssessmentContext();

  const handleCheckBox = (value: string) => {
    let tempSelectedFrameworkIds = { ...selectedFrameworkChildIds };
    if (
      selectedFrameworkChildIds[selectedFrameWorkId] &&
      selectedFrameworkChildIds[selectedFrameWorkId].includes(value)
    ) {
      tempSelectedFrameworkIds[selectedFrameWorkId].forEach(
        (tempSelectedFrameworkId, index) => {
          if (value === tempSelectedFrameworkId) {
            tempSelectedFrameworkIds[selectedFrameWorkId].splice(index, 1);
          }
        }
      );
      setSelectedFrameworkChildIds(tempSelectedFrameworkIds);
    } else {
      if (selectedFrameworkChildIds[selectedFrameWorkId]) {
        setSelectedFrameworkChildIds({
          ...selectedFrameworkChildIds,
          [selectedFrameWorkId]: [
            ...selectedFrameworkChildIds[selectedFrameWorkId],
            value,
          ],
        });
      } else {
        setSelectedFrameworkChildIds({
          ...selectedFrameworkChildIds,
          [selectedFrameWorkId]: [value],
        });
      }
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      frameworkChildren(selectedFrameworkChildIds[selectedFrameWorkId]),
    onSuccess: async ({ data }) => {
      if (data) {
        const tempSelectedTopics = data.data.map((topic) => {
          return {
            ...topic.category,
            preference: "",
            weight: topic.weight,
            value: 0,
            isDisable: true,
            frameworkType: CHILDREN,
          };
        });

        setSelectedTopics(tempSelectedTopics);
        setStep(3);
      }
    },
    onError: () => {},
  });

  const handleClickProceed = async () => {
    if (
      selectedFrameworkChildIds[selectedFrameWorkId] &&
      selectedFrameworkChildIds[selectedFrameWorkId].length > 0
    ) {
      mutation.mutate();
    } else {
      toastError("Select available options");
    }
  };

  return (
    <>
      {selectedFramework && (
        <>
          <Stack
            sx={{
              minWidth: { lg: "928px", xs: "auto" },
            }}
          >
            <Header
              heading={selectedFramework?.frameworks.name || ""}
              icon={selectedFramework?.frameworks.icon || ""}
            />

            <Stack
              sx={{
                marginTop: "1rem",
              }}
            >
              {selectedFramework.frameworks.frameworks &&
                selectedFramework.frameworks.frameworks.map(
                  (frameworkChild, i) => (
                    <Stack
                      key={i}
                      sx={{
                        marginTop: "1.75rem",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          selectedFrameworkChildIds[selectedFrameWorkId] &&
                          selectedFrameworkChildIds[
                            selectedFrameWorkId
                          ].includes(`${frameworkChild.id}`)
                        }
                        onChange={() => handleCheckBox(`${frameworkChild.id}`)}
                        control={
                          <Checkbox
                            icon={
                              <Image
                                priority
                                src={GreyCircle}
                                alt={"icon"}
                                width={16}
                                height={16}
                              />
                            }
                            checkedIcon={
                              <Image
                                priority
                                src={TickBlueCircle}
                                alt={"icon"}
                                width={16}
                                height={16}
                              />
                            }
                          />
                        }
                        label={
                          <TextXs
                            text={frameworkChild.name}
                            sx={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: "var(--primary)",
                              lineHeight: "1.5rem",
                            }}
                          />
                        }
                      />

                      <CustomDivider sx={{ marginTop: "0.75rem" }} />
                    </Stack>
                  )
                )}
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              marginTop: "2rem",

              gap: "1.5rem",
            }}
          >
            <FilledButton
              onClick={() => {
                setStep(1);
              }}
              secondary
              text="Previous step"
            />

            <FilledButton
              loading={mutation.isLoading}
              onClick={handleClickProceed}
              text="Proceed"
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default SelectedFrameworkComp;
