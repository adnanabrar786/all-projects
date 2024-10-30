import { Stack } from "@mui/material";
import ScoreCard from "components/common/Card/ScoreCard";
import IconText from "components/common/IconText";
import FilledCircularProgress from "components/common/Progress/FilledCircularProgress";
import ProposalHeading from "components/ui/clients/ClientDetails/Proposals/ProposalHeading";
import { getProposalDetailsValueType } from "constants/data";
import { IProposalValueType } from "interfaces/common";

const ValuesProfile = () => {
  let graphs: IProposalValueType[] = getProposalDetailsValueType("overview");

  return (
    <>
      <Stack direction={"row"}>
        <ScoreCard
          text={"70"}
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

        <ProposalHeading />

        <Stack direction={"row"} sx={{ gap: "2rem" }}>
          {graphs.map((graph, index) => (
            <Stack key={index} sx={{ alignItems: "center", width: "7rem" }}>
              <FilledCircularProgress
                emptyColor="var(--ghost-white)"
                value={graph.value}
              />

              <IconText
                icon={graph.icon}
                text={graph.name}
                iconHeight={16}
                iconWidth={17}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ValuesProfile;
