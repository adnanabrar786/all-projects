import { Box, ClickAwayListener, ListItemButton, Stack } from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import RiskValue from "components/ui/clients/ClientDetails/Proposals/Details/RiskValue";
import TopicValues from "components/ui/clients/ClientDetails/Proposals/Details/TopicValues";
import { DotsVerticalIcon, PencilLine } from "constants/images.routes";
import { CLIENTS_DETAILS } from "constants/pages.routes";
import {
  ICompareProposalRisk,
  ICompareProposalSummary,
  ICompareProposalTopics,
  ICurrentPortfolioHolding,
} from "interfaces/proposal";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { truncateStringIfNeeded } from "utils/string";

interface Props {
  highlight?: boolean;
  chipText: string;
  title: string;
  portfolioHolding: ICurrentPortfolioHolding;
  summary: ICompareProposalSummary;
  values_score: number;
  risk: ICompareProposalRisk;
  topics: ICompareProposalTopics[];
}

const ValuesCard = ({
  highlight,
  title,
  chipText,
  portfolioHolding,
  summary,
  values_score,
  risk,
  topics,
}: Props) => {
  const summaryData: string[] = [
    `${summary.advisor_fee ?? 0}%`,
    `${summary.expense_ratio ?? 0}%`,
    `${summary.dividend_yield ?? 0}%`,
  ];
  const [openMenu, setOpenMenu] = useState(false);
  const tickers = portfolioHolding.tickers.join(",");

  const { clientId, proposalId }: { clientId: string; proposalId: string } =
    useParams();

  return (
    <>
      <Stack
        sx={{
          border: highlight
            ? "1px solid var(--primary)"
            : "1px solid var(--gray-200)",
          borderRadius: "1rem 1rem 0 0",
        }}
      >
        <Stack
          sx={{
            height: "30rem",
          }}
        >
          <Stack
            sx={{
              padding: "1.06rem 0.81rem 0rem 0.81rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextXs
                sx={{
                  color: "var(--text-secondary)",
                  fontWeight: "700",
                  lineHeight: "1.75rem",
                }}
                text={truncateStringIfNeeded(tickers, 33)}
              />

              {chipText === "Model" && (
                <Stack
                  sx={{
                    position: "relative",
                    width: "1rem",
                    height: "1rem",
                    img: {
                      cursor: "pointer",
                    },
                  }}
                >
                  <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                    <Box>
                      {openMenu ? (
                        <MenuCard sx={{ minWidth: "12rem" }}>
                          <Link
                            href={`${CLIENTS_DETAILS}/${clientId}/proposals/${proposalId}`}
                          >
                            <ListItemButton>
                              <IconText
                                text="Modify Portfolio"
                                icon={PencilLine}
                                iconWidth={14}
                                iconHeight={14}
                              />
                            </ListItemButton>
                          </Link>
                        </MenuCard>
                      ) : null}

                      <Image
                        priority
                        src={DotsVerticalIcon}
                        alt={"icon"}
                        fill
                        onClick={() => setOpenMenu(!openMenu)}
                      />
                    </Box>
                  </ClickAwayListener>
                </Stack>
              )}
            </Stack>

            <Stack
              sx={{
                gap: "0.25rem",
                marginTop: "1.87rem",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  gap: "0.94rem",
                }}
              >
                <TextMd
                  sx={{
                    fontWeight: "700",
                    lineHeight: "1.75rem",
                  }}
                  text={title}
                />

                <Stack
                  sx={{
                    backgroundColor: "var(--background-color4)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0rem 0.5rem",
                    borderRadius: "1rem",
                  }}
                >
                  <TextXs
                    sx={{
                      color:
                        chipText === "Model"
                          ? "var(--text-success)"
                          : "var(--primary3)",
                      fontWeight: "600",
                      lineHeight: "1.25rem",
                      fontSize: "0.75rem",
                    }}
                    text={chipText}
                  />
                </Stack>
              </Stack>
              <TextXs
                sx={{
                  color: "var(--text-secondary)",
                  fontWeight: "00",
                  lineHeight: "1.125rem",
                  fontSize: "0.75rem",
                }}
                text="Source: Reinitiv, Company Reporting"
              />
            </Stack>
          </Stack>

          <CustomDivider
            sx={{ marginTop: "0.81rem", marginBottom: "1.34rem" }}
          />
        </Stack>

        <Stack>
          <TextMd
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
              height: "3rem",
            }}
            text=""
          />
          {summaryData.map((data, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                backgroundColor: index === 1 ? "var(--gray-100)" : "",
                height: "3rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
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
            text=""
          />
          <Stack
            direction={"row"}
            sx={{
              backgroundColor: "var(--gray-100)",
              alignItems: "center",
              height: "3rem",
              paddingLeft: "2rem",
              textAlign: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                width: "2.25rem",
                height: "2.25rem",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var( --light-primary2)",
                borderRadius: "0.25rem",
              }}
            >
              <TextXs
                sx={{
                  fontWeight: "700",
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                }}
                text={`${values_score ? values_score.toFixed(0) : 0}`}
              />
            </Stack>
            {/* <Stack
              direction={"row"}
              sx={{
                gap: "0.19rem",
              }}
            >
              <TextXs
                sx={{
                  lineHeight: "1.125rem",
                  fontSize: "0.75rem",
                }}
                text="35%"
              />

              <Image
                priority
                src={GreenArrow}
                alt={"icon"}
                width={16}
                height={16}
              />
            </Stack> */}
          </Stack>
        </Stack>

        <TopicValues topics={topics} />

        <RiskValue risk={risk} />
      </Stack>
    </>
  );
};

export default ValuesCard;
