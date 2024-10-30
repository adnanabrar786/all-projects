import { Box, Grid, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import TextXs from "components/common/Text/TextXs";
import SummaryCard from "components/ui/clients/ClientDetails/Proposals/Details/SummaryCard";
import ValuesCard from "components/ui/clients/ClientDetails/Proposals/Details/ValuesCard";
import { ChevronDownWhiteIcon } from "constants/images.routes";
import useCompareProposalData from "hooks/useCompareProposalData";
import Image from "next/image";
import { useState } from "react";

const ValuesDetails = () => {
  const { compareProposal } = useCompareProposalData();

  const [showProposalMenu, setShowProposalMenu] = useState<boolean>(false);

  return (
    <Stack
      sx={{
        marginTop: "2.5rem",
        paddingBottom: "2.5rem",
        paddingRight: "2rem",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          marginLeft: "2rem",
        }}
      >
        <Stack>
          <TextXs
            text="Proposals"
            sx={{
              color: "var(--primary)",
              fontWeight: "500",
            }}
          />

          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <TextXs
              sx={{
                fontSize: "1.125rem",
                fontWeight: "700",
                width: "10rem",
                padding: "0",
              }}
              text={compareProposal?.name ?? ""}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            position: "relative",
          }}
        >
          <Box>
            <FilledButton
              onClick={() => setShowProposalMenu(!showProposalMenu)}
              text="Proposal actions"
              endIcon={
                <Image
                  priority
                  src={ChevronDownWhiteIcon}
                  alt={"icon"}
                  width={20}
                  height={20}
                />
              }
            />
          </Box>
        </Stack>
      </Stack>
      <Grid container sx={{ marginTop: "2.5rem" }}>
        <Grid
          sx={{
            display: "flex",
            width: "100%",
          }}
          item
          xs={4}
        >
          {compareProposal && (
            <SummaryCard
              topics={compareProposal.topics.current_porfolio_topics}
            />
          )}
        </Grid>

        {compareProposal && (
          <>
            <Grid item xs={4}>
              <ValuesCard
                title="Current Portfolio"
                chipText="Client"
                portfolioHolding={compareProposal?.current_portfolio_holdings}
                summary={compareProposal?.summary}
                values_score={
                  compareProposal.values_score.current_porfolio_score
                }
                risk={compareProposal.risk}
                topics={compareProposal.topics.current_porfolio_topics}
              />
            </Grid>

            <Grid item xs={4}>
              <ValuesCard
                highlight
                title="Proposed Portfolio"
                chipText="Model"
                portfolioHolding={compareProposal?.proposed_portfolio_holdings}
                summary={compareProposal?.summary}
                values_score={
                  compareProposal.values_score.proposed_porfolio_score
                }
                risk={compareProposal.risk}
                topics={compareProposal.topics.proposed_porfolio_topics}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Stack>
  );
};

export default ValuesDetails;
