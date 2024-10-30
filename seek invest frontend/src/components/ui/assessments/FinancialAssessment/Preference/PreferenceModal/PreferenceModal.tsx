import { Dialog, Stack } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { useAssessmentContext } from "context/assessment/AssessmentContext";

const PreferenceModal = () => {
  const { PreferenceModal, setPreferenceModal } = useAssessmentContext();

  return (
    <>
      <Dialog
        PaperProps={{
          sx: {
            border: "2px solid var(--gray-300)",
            borderRadius: "1rem",
          },
        }}
        open={PreferenceModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack>
          <Stack
            sx={{
              borderBottom: "1px solid var(--gray-200)",
              padding: "1.75rem 2.81rem 0.81rem 2.81rem",
            }}
          >
            <TextMd
              sx={{
                fontWeight: "700",
                lineHeight: "1.75rem",
              }}
              text="True Personalization"
            />
          </Stack>
          <TextXs
            sx={{
              padding: "1.87rem 2.81rem 0.81rem 2.81rem",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
            text="A company can be exposed to multiple issues. So craft your impact by choosing to embrace, or oppose on key topics and assigning their importance compared to each other. Our advanced analytics will adapt, delivering personalized insights and recommendations that resonate with your distinct values."
          />

          <TextXs
            onClick={() => setPreferenceModal(false)}
            sx={{
              padding: "1.44rem 2.81rem 5.31rem 2.81rem",
              color: "var(--primary)",
              fontWeight: "500",
              lineHeight: "1.25rem",
              cursor: "pointer",
            }}
            text="Dismiss"
          />
        </Stack>
      </Dialog>
    </>
  );
};

export default PreferenceModal;
