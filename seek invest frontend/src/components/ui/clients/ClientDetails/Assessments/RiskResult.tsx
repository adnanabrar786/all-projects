import { Grid, Stack, capitalize } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";

interface Props {
  isLoading: boolean;
  viewResult: any;
}

const RiskResult = ({ isLoading, viewResult }: Props) => {
  const riskProfile = [
    { name: "Risk Need", value: viewResult?.risk_need || "-" },
    {
      name: "Risk Perception",
      value: viewResult?.risk_perception || "-",
    },
    {
      name: "Risk Tolerance",
      value: viewResult?.risk_tolerance || "-",
    },
  ];

  return (
    !isLoading && (
      <Grid columnSpacing={2} container sx={{ mt: "2.5rem" }}>
        <Grid item xs={3}>
          <ClientSummaryCard title={"Risk Score"}>
            <Stack sx={{ alignItems: "center" }}>
              <TextMd
                text={"Moderately Aggressive"}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "0.8125",
                  lineHeight: "1.125rem",
                  textAlign: "center",
                }}
              />

              <TextXl
                text={
                  viewResult?.risk_score
                    ? `${Math.round(viewResult?.risk_score)}`
                    : "N/A"
                }
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "600",
                }}
              />

              <TextXs
                text={"Target Risk Score"}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "0.8125rem",
                  lineHeight: "1.125rem",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              />
            </Stack>
          </ClientSummaryCard>
        </Grid>

        <Grid item xs={9}>
          <ClientSummaryCard title={"Risk  Profile"}>
            <>
              {riskProfile.map((profile, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  sx={{
                    width: "100%",
                    borderBottom:
                      riskProfile.length - 1 !== index
                        ? "1px solid var(--gray-200)"
                        : "none",
                    justifyContent: "space-between",
                    ">p": {},
                  }}
                >
                  <TextXs text={profile.name} />
                  <TextXs
                    text={capitalize(profile.value)}
                    sx={{ fontWeight: "600" }}
                  />
                </Stack>
              ))}
            </>
          </ClientSummaryCard>
        </Grid>
      </Grid>
    )
  );
};

export default RiskResult;
