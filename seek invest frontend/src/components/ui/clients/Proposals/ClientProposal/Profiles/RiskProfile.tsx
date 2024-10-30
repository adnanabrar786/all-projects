import { Stack, capitalize } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ScoreCard from "components/common/Card/ScoreCard";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import { InfoCircleIcon } from "constants/images.routes";
import { useUserContext } from "context/user/UserContext";
import { EValueRiskOverview } from "enums/enums";
import useClientRiskPersonaOverviewData from "hooks/useClientRiskPersonaOverviewData";
import { useEffect, useRef } from "react";

const { RISK_OVERVIEW } = EValueRiskOverview;

const RiskProfile = () => {
  const { clientRiskPersona } = useClientRiskPersonaOverviewData();
  const { valuesRisk } = useUserContext();
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valuesRisk === RISK_OVERVIEW) {
      if (myRef.current) {
        myRef.current.scrollIntoView();
      }
    }
  }, [valuesRisk]);

  const riskProfile = [
    { name: "Overall", value: clientRiskPersona?.risk_overall || "-" },
    { name: "Risk Need", value: clientRiskPersona?.risk_need || "-" },
    {
      name: "Risk Perception",
      value: clientRiskPersona?.risk_perception || "-",
    },
    {
      name: "Risk Tolerance",
      value: clientRiskPersona?.risk_tolerance || "-",
    },
  ];

  const riskFeeRatioYield = [
    {
      name: "Advisory fee",
      value: clientRiskPersona
        ? `${clientRiskPersona.advisor_fee || 0}%`
        : "0%",
    },
    {
      name: "Expense Ratio",
      value: clientRiskPersona
        ? `${clientRiskPersona.expense_ratio || 0}%`
        : "0%",
    },
    {
      name: "Dividend Yield",
      value: clientRiskPersona
        ? `${clientRiskPersona.dividend_yield || 0}%`
        : "0%",
    },
  ];

  return (
    <>
      <Stack
        ref={myRef}
        direction={"row"}
        sx={{ mt: "1.63rem", mb: "3rem", alignItems: "flex-start" }}
      >
        {clientRiskPersona && clientRiskPersona.id ? (
          <>
            <ScoreCard
              text={"70"}
              subText={"Risk Score"}
              sx={{
                bgcolor: "var(--shampoo)",
                height: "8.125rem",
                minWidth: "7.6875rem",
              }}
              sxTitle={{
                fontSize: "1.875rem",
                fontWeight: "700",
                lineHeight: "2.375rem",
                fontStyle: "normal",
                color: "var(--text-primary)",
                filter: "blur(0.4rem)",
              }}
              sxSubTitle={{
                lineHeight: "1.125rem",
                fontStyle: "normal",
                color: "var(--text-primary)",
                marginTop: "0.5rem",
                filter: "blur(0.2rem)",
              }}
            />
            <Stack
              direction={"row"}
              sx={{
                ml: "2.5rem",
                width: "100%",
                gap: "1rem",
              }}
            >
              <TextXs
                text="RISK PERSONA"
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  textAlign: "center",
                }}
              />
              <Stack sx={{ width: "50%", gap: "0.5rem" }}>
                {riskProfile.map((profile, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    sx={{
                      borderBottom: "1px solid var(--text-secondary)",
                      padding: "0.5rem 0",
                      justifyContent: "space-between",
                      ">p": {
                        fontSize: "0.75rem",
                        lineHeight: "1.125rem",
                      },
                    }}
                  >
                    <TextXs text={profile.name} />
                    <TextXs
                      text={capitalize(profile.value)}
                      sx={{ fontWeight: "600" }}
                    />
                  </Stack>
                ))}
              </Stack>

              <Stack sx={{ width: "50%", gap: "0.5rem" }}>
                {riskFeeRatioYield.map((profile, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    sx={{
                      borderBottom: "1px solid var(--text-secondary)",
                      padding: "0.5rem 0",
                      justifyContent: "space-between",
                      "& p": {
                        fontSize: "0.75rem",
                        lineHeight: "1.125rem",
                      },
                    }}
                  >
                    <IconText
                      icon={InfoCircleIcon}
                      iconWidth={12}
                      iconHeight={13}
                      text={profile.name}
                      sxRow={{
                        flexDirection: "row-reverse",
                        img: { cursor: "pointer" },
                      }}
                    />
                    <TextXs
                      text={profile.value}
                      sx={{
                        fontWeight: "600",
                        filter: profile.value === "0%" ? "blur(5px)" : "none",
                      }}
                    />
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Stack
              sx={{
                marginTop: "28px",
                filter: "blur(0.12rem)",
                width: "100%",
                height: "147px",
                flexShrink: "0",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                paddingY: "0.5rem",
                borderRadius: "8px",
                border: " 1px solid var(--color-Border-border-subtle, #EAECF0)",
                background: "var(--color-Background-bg, #FFF)",
              }}
            >
              <Stack
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <TextXs
                  sx={{
                    color: "var(--color-Text-text, #344054)",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "18px",
                  }}
                  text="Values score will show up here "
                />
                <TextXs
                  sx={{
                    color: "var(--color-Text-text-secondary, #667085)",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "18px",
                  }}
                  text="Add an account to see how your client’s account performs with their values score"
                />
                <FilledButton
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    borderRadius: "8px",
                  }}
                  secondary
                  text="Add account"
                />
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default RiskProfile;
