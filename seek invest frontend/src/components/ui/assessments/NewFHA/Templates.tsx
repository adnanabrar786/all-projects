import { Grid, Skeleton } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import TemplateCard from "components/ui/assessments/NewFHA/TemplateCard";
import { CREATE_ASSESSMENT } from "constants/pages.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { TEMPLATE_ASSESSMENT } from "enums/assessment";
import { INewAssessment } from "interfaces/assessment";
import Link from "next/link";
import { getAssessmentTemplates } from "utils/assessments";
import { toastSuccess } from "utils/toaster";

const { VALUES_ASSESSMENT, RISK_ASSESSMENT } = TEMPLATE_ASSESSMENT;

interface Props {
  newAssessments: INewAssessment[];
  category: string;
}

const Templates = ({ newAssessments, category }: Props) => {
  const { deleteCustomQuestions } = useAssessmentContext();

  const data: INewAssessment | undefined = getAssessmentTemplates(
    newAssessments,
    category
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        className="scroll-hidden"
        sx={{
          marginTop: "1.63rem",
          height: "calc(100vh - 182px)",
          overflowY: "scroll",
        }}
      >
        {data
          ? data.assessments?.map((assessmentTemplate, index) => (
              <Grid key={index} item xs={6} lg={4}>
                <Link
                  onClick={(e) => {
                    deleteCustomQuestions();
                    const test: string[] = [VALUES_ASSESSMENT, RISK_ASSESSMENT];
                    if (!test.includes(assessmentTemplate.name)) {
                      toastSuccess("Cannot edit at the moment");
                      e.preventDefault();
                    }
                  }}
                  href={`${CREATE_ASSESSMENT}/${assessmentTemplate.parent_id}/${assessmentTemplate.id}`}
                >
                  <TemplateCard
                    assessmentTemplate={assessmentTemplate}
                    index={index}
                  />
                </Link>

                <TextXs
                  text={assessmentTemplate.name}
                  sx={{
                    color: "var(--text-primary)",
                    fontWeight: "600",
                    lineHeight: "1.25rem",
                    marginTop: "0.92rem",
                    marginBottom: "2rem",
                  }}
                />
              </Grid>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <Grid key={index} item xs={6} lg={4}>
                <Skeleton sx={{ transform: "none", height: "10rem" }} />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default Templates;
