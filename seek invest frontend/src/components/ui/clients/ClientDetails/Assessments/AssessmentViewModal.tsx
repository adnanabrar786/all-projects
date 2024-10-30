import { Dialog, Stack } from "@mui/material";
import DialogLoader from "components/common/DialogLoader";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import RiskResult from "components/ui/clients/ClientDetails/Assessments/RiskResult";
import ValuesResult from "components/ui/clients/ClientDetails/Assessments/ValuesResult";
import ViewModalQuestions from "components/ui/clients/ClientDetails/Assessments/ViewModalQuestions";
import { CrossGrey500Icon } from "constants/images.routes";
import { EAssessmentTemplateTypes } from "enums/assessment";
import useClientViewResult from "hooks/useClientViewResult";
import { IClientAssessment } from "interfaces/assessment";
import Image from "next/image";
import { getDateThFormat } from "utils/date";

const { VALUES, RISK } = EAssessmentTemplateTypes;

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  assessment: IClientAssessment;
}

const AssessmentViewModal = ({
  showModal,
  setShowModal,
  assessment,
}: Props) => {
  const { viewResult, isLoading } = useClientViewResult(assessment.id);

  const defaultQuestions: any = [];
  const customQuestions: any = [];

  if (viewResult && viewResult.submissions) {
    viewResult.submissions.forEach((submission) => {
      if (submission.is_default) {
        defaultQuestions.push(submission);
      } else {
        customQuestions.push(submission);
      }
    });
  }
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={showModal}
      onClose={() => setShowModal(false)}
      sx={{
        backdropFilter: "blur(8px)",
        ".MuiPaper-root": {
          padding: "1.5rem",
          boxShadow: "none",
          maxHeight: "80vh",
        },
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          img: {
            cursor: "pointer",
          },
        }}
      >
        <Stack>
          <Stack direction={"row"} sx={{ gap: "0.75rem" }}>
            <TextMd
              text={!isLoading && viewResult ? viewResult.assessment.name : ""}
              sx={{ fontWeight: "700" }}
            />
            {viewResult && viewResult.assessment.type === "CUSTOM" && (
              <TextXs
                sx={{
                  border: "1px solid var(--gray-300)",
                  fontSize: " 0.75rem",
                  borderRadius: " 0.375rem",
                  padding: "0.12rem 0.38rem",
                  fontWeight: "Primary",
                }}
                text={"Customized"}
              />
            )}
          </Stack>

          {viewResult && viewResult.assessment.completed_at && !isLoading && (
            <TextXs
              text={`Completed ${getDateThFormat(
                viewResult.assessment.completed_at
              )}`}
              sx={{ color: "var(--text-secondary)" }}
            />
          )}
        </Stack>

        <Image
          onClick={() => setShowModal(false)}
          priority
          src={CrossGrey500Icon}
          alt={"icon"}
          width={20}
          height={20}
        />
      </Stack>

      {isLoading && <DialogLoader />}

      {assessment.type === VALUES && (
        <ValuesResult
          isLoading={isLoading}
          viewResult={viewResult ? viewResult.vda : []}
        />
      )}

      {assessment.type === RISK && (
        <RiskResult
          isLoading={isLoading}
          viewResult={viewResult ? viewResult.crp : []}
        />
      )}

      {!isLoading && viewResult && defaultQuestions.length > 0 && (
        <Stack
          sx={{
            border: "1px solid var(--gray-300)",
            borderRadius: "0.5rem",
            justifyContent: "center",
            mt: "1.5rem",
            padding: "1rem",
            gap: "2.5rem",
          }}
        >
          {defaultQuestions.map((question, index) => (
            <ViewModalQuestions key={index} question={question} />
          ))}
        </Stack>
      )}

      {!isLoading && viewResult && customQuestions.length > 0 && (
        <Stack
          sx={{
            border: "1px solid var(--gray-300)",
            borderRadius: "0.5rem",
            justifyContent: "center",
            mt: "1.5rem",
            padding: "1rem",
            gap: "2.5rem",
          }}
        >
          {customQuestions.map((question, index) => (
            <ViewModalQuestions key={index} question={question} />
          ))}
        </Stack>
      )}
    </Dialog>
  );
};

export default AssessmentViewModal;
