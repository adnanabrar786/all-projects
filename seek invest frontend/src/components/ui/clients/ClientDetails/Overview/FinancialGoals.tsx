import {
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  capitalize,
} from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextMd from "components/common/Text/TextMd";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import ClientSummaryCard from "components/ui/clients/ClientDetails/Overview/ClientSummaryCard";
import ClientSummaryCardPlaceholder from "components/ui/clients/ClientDetails/Overview/ClientSummaryCardPlaceholder";
import useClientFinancialGoals from "hooks/useClientFinancialGoals";
import useClientRiskPersonaOverviewData from "hooks/useClientRiskPersonaOverviewData";
import useClientValuesPersonaSummaryData from "hooks/useClientValuesPersonaSummaryData";
import Image from "next/image";
import { normalizeProgressValue } from "utils/maths";

const FinancialGoals = () => {
  const { clientRiskPersona, isRiskPersonaError } =
    useClientRiskPersonaOverviewData();

  const { clientValuesPersona, isValuePersonaError } =
    useClientValuesPersonaSummaryData();

  const { clientFinancialGoals, isError } = useClientFinancialGoals();

  const financialGoals = [
    {
      title: "Primary Financial Goal",
      placeholder:
        "Send a risk assessment to capture your client’s primary financial goal",
      responseTitle:
        clientFinancialGoals && clientFinancialGoals.primary
          ? clientFinancialGoals.primary.title
          : "",
      response:
        clientFinancialGoals && clientFinancialGoals.primary
          ? clientFinancialGoals.primary.response
          : "",
    },
    {
      title: "Secondary Financial Goal",
      placeholder:
        "Send a risk assessment to capture your client’s secondary financial goal",
      responseTitle:
        clientFinancialGoals && clientFinancialGoals.secondary
          ? clientFinancialGoals.secondary.title
          : "",
      response:
        clientFinancialGoals && clientFinancialGoals.secondary
          ? clientFinancialGoals.secondary.response
          : "",
    },
  ];

  const riskProfile = [
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

  let valuesResult: any = [];

  if (clientValuesPersona) {
    valuesResult = clientValuesPersona.map((res) => {
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
  }

  return (
    <Grid container columnSpacing={2.5} rowSpacing={4.5} sx={{ mt: "0rem" }}>
      {financialGoals.map((financialGoal, index) => (
        <Grid item xs={6} key={index}>
          <ClientSummaryCard
            title={financialGoal.title}
            sx={{
              justifyContent: financialGoal.responseTitle ? "start" : "center",
              alignItems: financialGoal.responseTitle ? "start" : "center",
            }}
          >
            {clientFinancialGoals || !isError ? (
              <>
                {financialGoal.responseTitle ? (
                  <Typography
                    sx={{ span: { fontWeight: "600" }, fontSize: "0.75rem" }}
                  >
                    <span>{financialGoal.responseTitle}: </span>
                    {financialGoal.response}
                  </Typography>
                ) : (
                  <ClientSummaryCardPlaceholder
                    text={financialGoal.placeholder}
                  />
                )}
              </>
            ) : (
              !isError && (
                <Stack
                  sx={{ gap: "1rem", width: "100%", alignItems: "center" }}
                >
                  <Skeleton width={"60%"} />
                  <Skeleton width={"40%"} />
                </Stack>
              )
            )}
          </ClientSummaryCard>
        </Grid>
      ))}

      <Grid item xs={3}>
        <ClientSummaryCard title={"Risk Score"}>
          {clientRiskPersona ? (
            <Stack sx={{ alignItems: "center" }}>
              {clientRiskPersona?.risk_overall && (
                <TextMd
                  text={clientRiskPersona.risk_overall}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "0.8125",
                    lineHeight: "1.125rem",
                  }}
                />
              )}

              <TextXl
                text={
                  clientRiskPersona.risk_score
                    ? `${Math.round(clientRiskPersona.risk_score)}`
                    : "N/A"
                }
                sx={{
                  fontSize: "2.5rem",
                  color: clientRiskPersona.risk_score
                    ? "var(--text-primary)"
                    : "var(--gray-500)",
                  fontWeight: "600",
                }}
              />

              {clientRiskPersona?.risk_overall && (
                <TextXs
                  text={"Target Risk Score"}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "0.8125rem",
                    lineHeight: "1.125rem",
                  }}
                />
              )}
            </Stack>
          ) : (
            <Skeleton width={"5rem"} height={"6rem"} />
          )}
        </ClientSummaryCard>
      </Grid>

      <Grid item xs={7.5}>
        <ClientSummaryCard title={"Risk  Profile"}>
          {clientRiskPersona || isRiskPersonaError ? (
            <>
              {clientRiskPersona?.risk_overall && !isRiskPersonaError ? (
                riskProfile.map((profile, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    sx={{
                      width: "100%",
                      borderBottom: "1px solid var(--gray-200)",
                      justifyContent: "space-between",
                      ">p": {
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
                ))
              ) : (
                <ClientSummaryCardPlaceholder
                  text={
                    "Send a risk assessment to capture your client’s risk profile"
                  }
                />
              )}
            </>
          ) : (
            !isRiskPersonaError && (
              <Stack sx={{ gap: "1rem", width: "100%", alignItems: "center" }}>
                <Skeleton width={"60%"} />
                <Skeleton width={"40%"} />
              </Stack>
            )
          )}
        </ClientSummaryCard>
      </Grid>

      <Grid item xs={12}>
        <ClientSummaryCard title={"Values Profile"}>
          {clientValuesPersona || !isValuePersonaError ? (
            <>
              {clientValuesPersona && clientValuesPersona.length ? (
                <Stack
                  sx={{
                    width: "100%",
                    mb: "2.25rem",
                  }}
                >
                  <TableContainer sx={{ overflow: "visible" }}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                      <TableHead>
                        <TableRow
                          sx={{
                            width: "100%",
                            ".MuiTableCell-root": {
                              color: "var(--text-primary)",
                              borderWidth: "1px",
                              borderColor: "var(--gray-200)",
                              fontSize: "0.8125rem",
                              lineHeight: "1.25rem",
                              fontStyle: "normal",
                            },
                          }}
                        >
                          <TableCell>Ranking</TableCell>
                          <TableCell>Topic</TableCell>
                          <TableCell>Preference</TableCell>
                          <TableCell>Importance</TableCell>
                        </TableRow>
                      </TableHead>

                      {valuesResult.map((result, index) => (
                        <TableBody key={index}>
                          <TableRow>
                            <TableCell>
                              <Stack>
                                <TextXs
                                  sx={{
                                    fontSize: "0.8125rem",
                                    fontWeight: "400",
                                    lineHeight: "1.25rem",
                                    fontStyle: "normal",
                                    color: "var(--text-primary)",
                                    ml: "1rem",
                                  }}
                                  text={`${index + 1}`}
                                />
                              </Stack>
                            </TableCell>

                            <TableCell>
                              <TextXs
                                sx={{
                                  lineHeight: "1.25rem",
                                }}
                                text={result.name}
                              />
                            </TableCell>

                            <TableCell>
                              <Stack
                                direction={"row"}
                                sx={{
                                  gap: "0.44rem",
                                  alignContent: "center",
                                }}
                              >
                                <Image
                                  priority
                                  src={result.icon}
                                  alt={"icon"}
                                  width={20}
                                  height={20}
                                />

                                <TextXs
                                  sx={{
                                    lineHeight: "1.25rem",
                                    color: "var(--text-primary)",
                                  }}
                                  text={`I will ${result.options} this topic`}
                                />
                              </Stack>
                            </TableCell>

                            <TableCell>
                              {result.weight > 0 && (
                                <Stack
                                  direction={"row"}
                                  sx={{
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <TextXs
                                    sx={{
                                      lineHeight: "1.25rem",
                                      color: "var(--text-primary)",
                                    }}
                                    text={`${normalizeProgressValue(
                                      result.weight
                                    )}`}
                                  />
                                  <CustomizedProgressBars
                                    value={result.weight}
                                    sx={{
                                      backgroundColor: "var(--black)",
                                      height: "0.2rem",
                                    }}
                                  />
                                </Stack>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>
                </Stack>
              ) : (
                <ClientSummaryCardPlaceholder text="Send a values assessment to discover what matters most to your client" />
              )}
            </>
          ) : (
            !isValuePersonaError && (
              <Stack sx={{ gap: "1rem", width: "100%", alignItems: "center" }}>
                <Skeleton width={"60%"} />
                <Skeleton width={"40%"} />
              </Stack>
            )
          )}
        </ClientSummaryCard>
      </Grid>
    </Grid>
  );
};

export default FinancialGoals;
