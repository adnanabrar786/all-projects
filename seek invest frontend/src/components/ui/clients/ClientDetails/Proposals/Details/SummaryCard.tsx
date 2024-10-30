import { Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import RiskSummary from "components/ui/clients/ClientDetails/Proposals/Details/RiskSummary";
import TopicsSummary from "components/ui/clients/ClientDetails/Proposals/Details/TopicsSummary";
import useClientByIdData from "hooks/useClientByIdData";
import { ICompareProposalTopics } from "interfaces/proposal";

const summaryData: string[] = [
  "Advisory Fee",
  "Expense Ratio",
  "Dividend Yield",
];

type Props = {
  topics: ICompareProposalTopics[];
};

const SummaryCard = ({ topics }: Props) => {
  const { client } = useClientByIdData();
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          paddingTop: "2.9rem",
        }}
      >
        <Stack
          sx={{
            height: "27.2rem",
          }}
        >
          <Stack
            sx={{
              marginLeft: "2rem",
            }}
          >
            <TextMd
              sx={{
                fontWeight: "700",
                lineHeight: "1.75rem",
              }}
              text={`${client?.first_name ?? ""} ${client?.last_name ?? ""}`}
            />
            <TextXs
              sx={{
                fontWeight: "400",
                lineHeight: "1.25rem",
                color: "var(--text-secondary)",
              }}
              text={client?.email ?? ""}
            />
          </Stack>
          <CustomDivider sx={{ marginTop: "0.81rem", width: "100%" }} />
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "300px",
              paddingRight: "0.62rem",
              marginLeft: "2rem",
            }}
          >
            <TextMd
              sx={{
                fontWeight: "700",
                lineHeight: "1.75rem",
              }}
              text="Distribution"
            />
            <TextXs
              sx={{
                fontWeight: "400",
                lineHeight: "1.25rem",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                textAlign: "center",
              }}
              text="Portfolio Composition"
            />
          </Stack>
        </Stack>

        <Stack>
          <TextMd
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
              height: "3rem",
              paddingLeft: "2rem",
            }}
            text="Summary"
          />

          {summaryData.map((data, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                backgroundColor: index === 1 ? "var(--gray-100)" : "",
                alignItems: "center",
                height: "3rem",
                paddingLeft: "2rem",
              }}
            >
              <TextXs
                sx={{
                  fontWeight: "600",
                  lineHeight: "1.25rem",
                }}
                text={data}
              />
            </Stack>
          ))}
        </Stack>

        <Stack
          sx={{
            marginTop: "2.81rem",
          }}
        >
          <TextMd
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
              height: "3rem",
              paddingLeft: "2rem",
            }}
            text="Values"
          />
          <Stack
            direction={"row"}
            sx={{
              backgroundColor: "var(--gray-100)",
              alignItems: "center",
              height: "3rem",
              paddingLeft: "2rem",
            }}
          >
            <TextXs
              sx={{
                fontWeight: "600",
                lineHeight: "1.25rem",
              }}
              text="Values Score"
            />
          </Stack>
        </Stack>

        <TopicsSummary topics={topics} />

        <RiskSummary />
      </Stack>
    </>
  );
};

export default SummaryCard;
