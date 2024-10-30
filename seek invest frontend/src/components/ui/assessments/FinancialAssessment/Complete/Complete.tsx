import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import TextXs from "components/common/Text/TextXs";
import CompleteAssessmentImage from "components/ui/assessments/FinancialAssessment/CompleteAssessmentImage";
import RiskOverview from "components/ui/assessments/FinancialAssessment/Goal/RiskOverview/RiskOverview";
import Values from "components/ui/assessments/FinancialAssessment/Values";
import { EAssessmentTemplateTypes } from "enums/assessment";
import { IComplianceResult, IValuesResult } from "interfaces/assessment";
import { useParams } from "next/navigation";
import { useState } from "react";
import { calculateAssessmentScore } from "services/assessment.services";
import { formatPhoneNumber } from "utils/maths";

const { VALUES, RISK } = EAssessmentTemplateTypes;
interface Props {
  firm_name: string;
  firm_logo: string;
  firm_member_name: string;
  firm_member_phone: string;
  firm_member_email: string;
  assessment_template_name: string;
}

const Complete = ({
  firm_name,
  firm_logo,
  firm_member_name,
  firm_member_phone,
  firm_member_email,
  assessment_template_name,
}: Props) => {
  const [seeResult, setSeeResult] = useState(false);
  const [valuesResult, setValuesResult] = useState<IValuesResult[]>([]);
  const [complianceResult, setComplianceResult] =
    useState<IComplianceResult | null>(null);
  const params = useParams();

  const [assessmentId, firmName, clientName, assessmentName, clientId] =
    params.app as string[];

  const mutation = useMutation({
    mutationFn: () => calculateAssessmentScore(assessmentId, clientId),
    onSuccess: async ({ data }) => {
      if (data && data.data) {
        const response = data.data;

        switch (assessment_template_name) {
          case VALUES:
            let tempResponse = response.map((res) => {
              return {
                weight: res.weight,
                name: res.category.name,
                code: res.category.code,
                parent: res.category.parent,
                bgColor: res.category.background_color,
                icon: res.preference.icon,
                options: res.preference.options,
              };
            });
            setValuesResult(tempResponse);
            break;
          case RISK:
            setComplianceResult(response);
            break;

          default:
            break;
        }

        setSeeResult(true);
      }
    },
    onError: () => {},
  });

  const handleVisitResult = async () => {
    if (!mutation.isLoading) {
      await mutation.mutateAsync();
    }
  };

  return (
    <>
      {!seeResult && (
        <Stack
          sx={{
            justifyContent: "space-between",
            position: "absolute",
            left: "0",
            height: "85vh",
            bottom: "0rem",
            width: "100vw",
          }}
        >
          <Stack
            sx={{
              marginTop: "7.69rem",
              alignItems: "center",
              gap: "2.13rem",
            }}
          >
            <CompleteAssessmentImage />

            <FilledButton
              loading={mutation.isLoading}
              onClick={handleVisitResult}
              text="View Results"
            />
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              position: "absolute",
              bottom: "1rem",
            }}
          >
            <Box />

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "0.75rem",
                paddingRight: "2.25rem",
              }}
            >
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                }}
                text={firm_member_name}
              />
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                }}
                text={firm_member_email}
              />
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                }}
                text={formatPhoneNumber(firm_member_phone)}
              />
            </Stack>
          </Stack>
        </Stack>
      )}

      {seeResult &&
        assessment_template_name === VALUES &&
        valuesResult.length > 0 && <Values valuesResult={valuesResult} />}

      {seeResult && assessment_template_name === RISK && complianceResult && (
        <RiskOverview complianceResult={complianceResult} />
      )}
    </>
  );
};

export default Complete;
