import { Box, Grid, Stack, SxProps, Typography } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import TextXl from "components/common/Text/TextXl";
import {
  ArrowDownRedIcon,
  ArrowUpGreenIcon,
  MinusYellowIcon,
} from "constants/images.routes";
import { ALIGNMENTS_SCORE_LABEL } from "enums/enums";
import { EProposalAlignmentTypes } from "enums/proposal";
import { IGenerateProposalComparison } from "interfaces/proposal";
import { getValueAlignmentBg } from "utils/valueAlignment";
const { LOW, HIGH, MEDIUM } = ALIGNMENTS_SCORE_LABEL;
const { RISK, VALUES, TOPICS } = EProposalAlignmentTypes;

interface AlignmentBoxProps {
  proposalAlignmentType: EProposalAlignmentTypes;
  alignment: string;
  score: number | null;
  status: ALIGNMENTS_SCORE_LABEL | null;
  preferenceIcon?: string;
  preference?: string;
  totalTopics: number | null;
  currentTarget?: { title: string; value: number }[];
  current?: boolean;
  sx?: SxProps;
}

const AlignmentBox = ({
  proposalAlignmentType,
  currentTarget,
  totalTopics,
  current,
  preferenceIcon,
  preference,
  alignment,
  score,
  status,
  sx,
}: AlignmentBoxProps) => {
  const renderValues = () => {
    switch (proposalAlignmentType) {
      case RISK:
        return (
          currentTarget &&
          currentTarget.map((currTar, i) => (
            <Stack key={i} direction={"row"} sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  paddingRight: "1rem",
                  paddingLeft: i !== 0 ? "1rem" : "0",
                  span: {
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  },
                }}
              >
                {currTar.title}{" "}
                <span>
                  {currTar.value != null ? Math.round(currTar.value) : "N/A"}
                </span>
              </Typography>
              {i == 0 && (
                <Box
                  sx={{
                    height: "0.8rem",
                    width: "0.1rem",
                    backgroundColor: "var(--gray-300)",
                  }}
                />
              )}
            </Stack>
          ))
        );

      case VALUES:
        return (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",

              span: {
                fontWeight: "600",
                color: "var(--text-primary)",
              },
            }}
          >
            Total Values Topics <span> {totalTopics}</span>
          </Typography>
        );

      case TOPICS:
        return (
          <Stack>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",

                span: {
                  fontWeight: "600",
                  color: "var(--text-primary)",
                },
              }}
            >
              Importance <span> {totalTopics}</span>
            </Typography>
            <IconText
              sxRow={{
                mt: "0.5rem",
                flexDirection: "row-reverse",
                justifyContent: "start",
                gap: "0.6rem",
              }}
              sxText={{
                color: "var(--text-secondary)",
                fontSize: "0.75rem",
                fontWeight: "400",
                textTransform: "capitalize",
              }}
              text={preference || ""}
              icon={preferenceIcon}
              iconWidth={16}
              iconHeight={16}
            />
          </Stack>
        );

      default:
        return <></>;
    }
  };

  return (
    <Stack
      sx={{
        borderRadius: current ? "0.5rem" : "0",
        border: "1px solid var(--gray-200)",
        padding: "1.5rem",
        mt: "1.25rem",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        position: "relative",
        ...sx,
      }}
    >
      {!current && (
        <Box
          sx={{
            height: "0.8rem",
            width: "100%",
            backgroundColor: "var(--text-primary)",
            position: "absolute",
            top: "-0.7rem",
            left: "-0.05rem",
            paddingX: "0.05rem",
            borderRadius: "0.5rem 0.5rem 0px 0px",
          }}
        />
      )}
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Stack>
          <TextMd text={alignment} sx={{ color: "--text-grey" }} />
          <Stack direction={"row"} sx={{ mt: "0.5rem" }}>
            {renderValues()}
          </Stack>
        </Stack>

        <IconText
          icon={
            status === LOW
              ? ArrowDownRedIcon
              : status === MEDIUM
              ? MinusYellowIcon
              : ArrowUpGreenIcon
          }
          iconWidth={10}
          iconHeight={10}
          text={status !== null ? status : "N/A"}
          sxText={{
            color: status ? getValueAlignmentBg(status)?.color : "black",
            fontWeight: "500",
            fontSize: "0.8125rem",
          }}
          sxRow={{
            backgroundColor: status
              ? getValueAlignmentBg(status)?.backgroundColor
              : "transparent",
            gap: "0.37rem",
            flexDirection: "row-reverse",
            paddingX: "0.8rem",
            borderRadius: "1rem",
          }}
        />
      </Stack>

      <Stack
        sx={{
          mt: "1.31rem",
          alignSelf: "center",
          backgroundColor: status
            ? getValueAlignmentBg(status)?.backgroundColor
            : "transparent",
          borderRadius: "50%",
          width: "9.8125rem",
          height: "9.8125rem",
          alignItems: "center",
          justifyContent: "center",
          mb: "1.5rem",
        }}
      >
        <TextXl
          text={score !== null ? `${Math.round(score)}` : "N/A"}
          sx={{
            fontSize: "4.5rem",
            fontWeight: "600",
            color: status ? getValueAlignmentBg(status)?.color : "black",
          }}
        />
      </Stack>
    </Stack>
  );
};

interface Props {
  generateComparison: IGenerateProposalComparison;
}
const CurrentVsProposedAlignment = ({ generateComparison }: Props) => {
  const isCurrentValuesAssessment =
    generateComparison.current_overall_alignments.filter(
      (val) => val.type === VALUES
    );
  const isProposedValuesAssessment =
    generateComparison.proposed_overall_alignment.filter(
      (val) => val.type === VALUES
    );

  return (
    <>
      {/* OVERALL ALIGNMENT */}
      <Grid
        columnSpacing={7}
        container
        sx={{ mt: "2.25rem", justifyContent: "space-between" }}
      >
        <Grid item xs={6}>
          <TextMd text="Current Overall Alignment" />
          <Stack sx={{ gap: "1rem" }}>
            {generateComparison.current_overall_alignments.map((val, i) => (
              <AlignmentBox
                currentTarget={[
                  {
                    title: "Current Risk",
                    value: val.current_risk,
                  },
                  {
                    title: "Target Risk",
                    value: val.target_risk,
                  },
                ]}
                current
                alignment={
                  val.type === RISK ? "Risk Alignment" : "Values Alignment"
                }
                score={val.label}
                status={val.status_label}
                proposalAlignmentType={val.type}
                totalTopics={val.total_topics}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <TextMd text="Proposed Overall Alignment" />
          <Stack sx={{ gap: "1rem" }}>
            {generateComparison.proposed_overall_alignment.map((val, i) => (
              <AlignmentBox
                currentTarget={[
                  {
                    title: "Current Risk",
                    value: val.current_risk,
                  },
                  {
                    title: "Target Risk",
                    value: val.target_risk,
                  },
                ]}
                alignment={
                  val.type === RISK ? "Risk Alignment" : "Values Alignment"
                }
                score={val.label}
                status={val.status_label}
                proposalAlignmentType={val.type}
                totalTopics={val.total_topics}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <CustomDivider sx={{ marginTop: "3.25rem" }} />

      {/* VALUES TOPICS */}
      {isCurrentValuesAssessment.length || isProposedValuesAssessment.length ? (
        <Grid
          columnSpacing={7}
          container
          sx={{ mt: "2.19rem", justifyContent: "space-between" }}
        >
          <Grid item xs={6}>
            <TextMd text="Current Values Topics Alignment" />
            <Stack sx={{ gap: "1rem" }}>
              {generateComparison.current_values_topiic_alignment.map(
                (val, i) => (
                  <AlignmentBox
                    current
                    alignment={val.topic_name}
                    score={
                      val.values_alignment
                        ? val.values_alignment.value_score
                        : null
                    }
                    status={
                      val.values_alignment
                        ? val.values_alignment.status_label
                        : null
                    }
                    proposalAlignmentType={TOPICS}
                    totalTopics={val.importance}
                    preferenceIcon={val.preference_icon}
                    preference={val.preference}
                  />
                )
              )}
              .
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <TextMd text="Proposed Values Topics Alignment" />
            <Stack sx={{ gap: "1rem" }}>
              {generateComparison.proposed_value_topic_alignment.map(
                (val, i) => (
                  <AlignmentBox
                    alignment={val.topic_name}
                    score={
                      val.values_alignment
                        ? val.values_alignment.value_score
                        : null
                    }
                    status={
                      val.values_alignment
                        ? val.values_alignment.status_label
                        : null
                    }
                    proposalAlignmentType={TOPICS}
                    totalTopics={val.importance}
                    preferenceIcon={val.preference_icon}
                    preference={val.preference}
                  />
                )
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default CurrentVsProposedAlignment;
