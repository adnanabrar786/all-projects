import { Skeleton, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextButton from "components/common/Button/TextButton";
import ScoreCard from "components/common/Card/ScoreCard";
import CircleChip from "components/common/Chip/CircleChip";
import IconText from "components/common/IconText";
import FilledCircularProgress from "components/common/Progress/FilledCircularProgress";
import TextXs from "components/common/Text/TextXs";
import TopicWeight from "components/common/TopicWeight";
import { CLIENTS_DETAILS, SHARE_ASSESSMENT } from "constants/pages.routes";
import { useUserContext } from "context/user/UserContext";
import { TEMPLATE_ASSESSMENT } from "enums/assessment";
import { EValueRiskOverview } from "enums/enums";
import useClientByIdData from "hooks/useClientByIdData";
import useClientValuesPersonaOverviewData from "hooks/useClientValuesPersonaOverviewData";
import useDefaultAssessmentData from "hooks/useDefaultAssessmentData";
import { IValuesPersonaList } from "interfaces/client";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef } from "react";

const { VALUES_ASSESSMENT } = TEMPLATE_ASSESSMENT;
const { VALUES_OVERVIEW } = EValueRiskOverview;

interface Props {
  profileType?: string;
  accountType: string;
  accountCount: number | null;
  proposal?: boolean;
  handleAddAccountState?: () => void;
  type: string;
  setType: (value: string) => void;
}

const ValuesProfile = ({
  profileType = "",
  accountType,
  accountCount,
  proposal,
  handleAddAccountState,
  type,
  setType,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { client } = useClientByIdData();
  const { clientId }: { clientId: string } = useParams();
  const { valuesRisk } = useUserContext();
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valuesRisk === VALUES_OVERVIEW) {
      if (myRef.current) {
        myRef.current.scrollIntoView();
      }
    }
  }, [valuesRisk]);

  const { clientValuesPersona, total_score, isLoading } =
    useClientValuesPersonaOverviewData(accountType);

  const { defaultAssessment } = useDefaultAssessmentData();

  const handleTypeChange = (type: string) => {
    setType(type);
  };

  const selectedPersona =
    clientValuesPersona &&
    (clientValuesPersona?.find((persona) => {
      return persona.name === type;
    }) as IValuesPersonaList);

  useEffect(() => {
    if (clientValuesPersona && clientValuesPersona.length > 0) {
      setType(clientValuesPersona[0].name);
    }
  }, [clientValuesPersona]);

  let valuesDeterminationLink = "";

  if (defaultAssessment) {
    let tempValuesDeterminationLink = defaultAssessment.find((assessment) => {
      return assessment.name === VALUES_ASSESSMENT;
    });

    if (tempValuesDeterminationLink) {
      valuesDeterminationLink = `${SHARE_ASSESSMENT}/${tempValuesDeterminationLink.id}`;
    }
  }

  return (
    <Stack
      ref={myRef}
      direction={"row"}
      sx={{ mt: "1.63rem", mb: "3rem", alignItems: "flex-start" }}
    >
      {clientValuesPersona && clientValuesPersona.length > 0 && accountCount ? (
        <>
          <ScoreCard
            text={total_score.toFixed()}
            subText={"Values Score"}
            sx={{
              bgcolor: "var(--water-blue)",
              height: "8.125rem",
              minWidth: "7.6875rem",
            }}
            sxTitle={{
              fontSize: "1.875rem",
              fontWeight: "700",
              lineHeight: "2.375rem",
              fontStyle: "normal",
              color: "var(--text-primary)",
            }}
            sxSubTitle={{
              lineHeight: "1.125rem",
              fontStyle: "normal",
              color: "var(--text-primary)",
              marginTop: "0.5rem",
            }}
          />

          <Stack
            direction={"row"}
            sx={{
              gap: "0.5rem",
              ml: "2.5rem",
              mr: "4rem",
            }}
          >
            <TextXs
              text="VALUES  PERSONA"
              sx={{
                fontSize: "0.75rem",
                lineHeight: "1.125rem",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                textAlign: "center",
              }}
            />
            <Stack
              sx={{
                gap: "0.5rem",
              }}
            >
              {clientValuesPersona &&
                clientValuesPersona.map((profile, index) => {
                  let isActiveTab = type === profile.name;

                  return (
                    <TextButton
                      key={index}
                      text={profile.name}
                      endIcon={
                        <CircleChip
                          text={`${profile.count}`}
                          isActiveTab={isActiveTab}
                          sx={{
                            fontSize: "0.75rem !important",
                            backgroundColor: isActiveTab
                              ? "var(--lightest-blue)"
                              : "var(--gray-100)",
                            lineHeight: "1.125rem",
                          }}
                        />
                      }
                      onClick={() => {
                        handleTypeChange(profile.name);
                      }}
                      sx={{
                        width: "11rem",
                        color: isActiveTab
                          ? "var(--primary)"
                          : "var(--text-primary)",
                        background: isActiveTab
                          ? "var(--lightest-blue-opa)"
                          : "transparent",
                        justifyContent: "flex-start",
                        fontStyle: "normal",
                        lineHeight: "1.125rem",
                        fontSize: "0.875rem",
                        textTransform: "capitalize",
                      }}
                    />
                  );
                })}
            </Stack>
          </Stack>

          <Stack direction={"row"} sx={{ gap: "2rem", flexWrap: "wrap" }}>
            {selectedPersona &&
              selectedPersona.graphs.map((graph, index) => (
                <Stack
                  key={index}
                  sx={{
                    alignItems: "center",
                    width: "6rem",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <Stack sx={{ alignItems: "center" }}>
                    <FilledCircularProgress
                      emptyColor="var(--ghost-white)"
                      value={
                        graph?.score !== null
                          ? parseInt(graph?.score.toFixed())
                          : null
                      }
                    />

                    <IconText
                      sxText={{
                        lineHeight: "1.125rem",
                        mt: "0.5rem",
                      }}
                      icon={graph.icon}
                      text={graph.topic_name}
                      iconHeight={15}
                      iconWidth={15}
                    />
                  </Stack>

                  <TopicWeight
                    weight={graph.weight ? graph.weight.toFixed() : "0"}
                    sxText={{ fontSize: "0.75rem" }}
                  />
                </Stack>
              ))}
          </Stack>
        </>
      ) : (
        <Stack
          sx={{
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
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-xxs, 2px)",
              }}
            >
              <TextXs
                sx={{
                  color: "var(--color-Text-text, #344054)",
                  textAlign: "center",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "18px",
                }}
                text="Values score will show up here "
              />
              {!isLoading && client ? (
                <TextXs
                  sx={{
                    color: "var(--color-Text-text-secondary, #667085)",
                    textAlign: "center",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "18px",
                    width: "23.64206rem",
                  }}
                  text={`Create and send a values assessment to ${client?.first_name} ${client?.last_name} to evaluate their account(s) based on their values`}
                />
              ) : (
                <Stack
                  sx={{ width: "100%", alignItems: "center", gap: "0.25rem" }}
                >
                  <Skeleton sx={{ width: "100%", height: "1rem" }} />
                  <Skeleton sx={{ width: "80%", height: "1rem" }} />
                </Stack>
              )}
            </Stack>

            {!isLoading && accountCount !== null ? (
              <Link
                onClick={(e) => {
                  if (proposal && accountCount === 0) {
                    e.preventDefault();
                  }
                }}
                href={
                  accountCount > 0
                    ? valuesDeterminationLink
                    : `${CLIENTS_DETAILS}/${clientId}/accounts`
                }
              >
                <FilledButton
                  onClick={() => {
                    if (
                      proposal &&
                      accountCount === 0 &&
                      handleAddAccountState
                    ) {
                      handleAddAccountState();
                    }
                  }}
                  secondary
                  text={accountCount ? "Send Values Assessment" : "Add account"}
                />
              </Link>
            ) : (
              <Skeleton sx={{ width: "10rem", height: "3rem" }} />
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ValuesProfile;
