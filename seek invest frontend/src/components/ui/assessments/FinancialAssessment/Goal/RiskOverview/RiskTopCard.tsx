import { Stack, capitalize } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { InfoCircleIcon, thermometer } from "constants/images.routes";
import { IComplianceResult } from "interfaces/assessment";
import Image from "next/image";

interface Props {
  complianceResult: IComplianceResult;
}

const RiskTopCard = ({ complianceResult }: Props) => {
  const riskPersonData = [
    {
      title: "Overall",
      status: complianceResult.risk_overall,
    },
    {
      title: "Risk Need",
      status: complianceResult.risk_need,
    },
    {
      title: "Risk Perception",
      status: complianceResult.risk_perception,
    },
    {
      title: "Risk Tolerance",
      status: complianceResult.risk_tolerance,
    },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          marginTop: "2rem",
          gap: "0.5rem",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "var(--pink-medium-light)",
            width: "19.39563rem",
            maxWidth: "19.39563rem",
            borderTopLeftRadius: "1rem",
            padding: "0.5rem 1.3rem",
            height: "15.72081rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
              }}
              text="RISK SCORE"
            />
            <Image
              priority
              src={InfoCircleIcon}
              alt={"icon"}
              width={16}
              height={16}
            />
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              marginTop: "2.94rem",
              alignItems: "center",
              gap: "0.25rem",
              justifyContent: "center",
            }}
          >
            <Image
              priority
              src={thermometer}
              alt={"icon"}
              width={25}
              height={64}
            />
            <TextXs
              sx={{
                lineHeight: "5.625rem",
                letterSpacing: "-0.09rem",
                fontSize: "4.5rem",
                fontWeight: "600",
              }}
              text={`${Math.round(complianceResult.risk_score)}`}
            />
          </Stack>

          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <TextXs
              sx={{
                textAlign: "center",
                fontSize: "0.75rem",
                lineHeight: "1.125rem",
                backgroundColor: "var(--gray-100)",
                width: "fit-content",
                padding: "0.125rem 0.5rem",
                borderRadius: "1rem",
                textTransform: "capitalize",
              }}
              text={complianceResult.risk_overall}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            backgroundColor: "var(--gray-700)",
            borderTopRightRadius: "1rem",
            padding: "0.38rem 1.3rem",
            gap: "1.54rem",
            flex: "1",
          }}
        >
          <TextXs
            sx={{
              lineHeight: "1.25rem",
            }}
            text="RISK PERSONA"
          />

          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            {riskPersonData.map((data, index) => (
              <Stack
                key={index}
                direction={"row"}
                sx={{
                  width: "80%",
                  justifyContent: "space-between",
                  padding: "0.75rem 0.35rem 0.47rem 0.6rem",
                  borderBottom: "1px solid var(--text-secondary)",
                }}
              >
                <TextXs
                  sx={{
                    lineHeight: "1.25rem",
                  }}
                  text={data.title}
                />
                <TextXs
                  sx={{
                    fontWeight: "600",
                    lineHeight: "1.25rem",
                  }}
                  text={capitalize(data.status)}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default RiskTopCard;
