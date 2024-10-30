import { Grid, Stack, SxProps } from "@mui/material";
import Chip from "components/common/Chip/Chip";
import CustomDivider from "components/common/Divider/CustomDivider";
import IconText from "components/common/IconText";
import FilledCircularProgress from "components/common/Progress/FilledCircularProgress";
import TextXs from "components/common/Text/TextXs";
import { compareGraphs, riskFeeRatioYield } from "constants/data";
import {
  ArrowSquareUpRightIcon,
  ChevronDownSecondaryIcon,
  ThermometerIcon,
} from "constants/images.routes";
import Image from "next/image";

interface Props {
  portfolioName: string;
  totalAccounts: number;
  isProposed?: boolean;
  sx?: SxProps;
}

interface ScoreMeasureProps extends Partial<Props> {
  text: string;
  subText: string;
}

const ScoreMeasure = ({ isProposed, text, subText }: ScoreMeasureProps) => {
  return (
    <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
      <TextXs
        text={text}
        sx={{
          fontSize: "0.75rem",
          fontWeight: "700",
          lineHeight: "1.125rem",
        }}
      />

      {isProposed && (
        <>
          <TextXs
            text={subText}
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1.125rem",
            }}
          />

          <Image
            priority
            src={ArrowSquareUpRightIcon}
            alt={"icon"}
            width={16}
            height={17}
          />
        </>
      )}
    </Stack>
  );
};

const CompareMetrices = ({
  sx,
  portfolioName,
  totalAccounts,
  isProposed,
}: Props) => {
  return (
    <Stack
      sx={{
        mt: "2rem",
        padding: "1.5rem",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        border: isProposed
          ? "4px solid var(--primary2)"
          : "1px solid var(--gray-300)",
        borderRadius: "0.5rem",
        maxWidth: "30rem",
        position: "relative",
        ...sx,
      }}
    >
      {isProposed && (
        <TextXs
          text="Proposed"
          sx={{
            position: "absolute",
            top: "-16px",
            backgroundColor: "var(--primary)",
            color: "#fff",
            padding: "0.3rem 3.3rem",
            fontWeight: "700",
            clipPath: `polygon(7% 0%, 100% 0%, 93% 100%, 0% 100%)`,
          }}
        />
      )}
      <IconText
        text={portfolioName}
        icon={ChevronDownSecondaryIcon}
        iconWidth={24}
        iconHeight={25}
        sxRow={{ flexDirection: "row-reverse", alignSelf: "start" }}
        sxText={{ fontWeight: "700", lineHeight: "1.5rem", fontSize: "1rem" }}
      />

      <TextXs
        text={`${totalAccounts} Accounts`}
        sx={{
          fontWeight: "500",
          lineHeight: "1.25rem",
          color: "var(--text-secondary)",
        }}
      />

      <CustomDivider sx={{ mt: "0.78rem", mb: "0.87rem" }} />

      <ScoreMeasure text="Values Score" subText="10%" isProposed={isProposed} />

      <Grid container sx={{ justifyContent: "space-between", mt: "1.2rem" }}>
        {compareGraphs.map((graph, index) => (
          <Grid key={index} item md={2}>
            <Stack sx={{ alignItems: "center" }}>
              <FilledCircularProgress
                emptyColor="var(--ghost-white)"
                value={graph.value}
                props={{ size: 60 }}
                sxText={{ fontSize: "0.85075rem", lineHeight: "1.27613rem" }}
              />

              <IconText
                icon={graph.icon}
                text={graph.name}
                iconHeight={15}
                iconWidth={14}
                sxText={{ fontSize: "0.625rem" }}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>

      <CustomDivider sx={{ mt: "0.78rem", mb: "0.87rem" }} />

      <ScoreMeasure text="Risk Score" subText="10%" isProposed={isProposed} />

      <Stack
        direction={"row"}
        sx={{ gap: "1rem", alignItems: "center", mt: "0.25rem" }}
      >
        <IconText
          icon={ThermometerIcon}
          text="42"
          iconWidth={13}
          iconHeight={30}
          sxText={{
            fontSize: "2rem",
            fontWeight: "600",
            lineHeight: "2.5905rem",
            letterSpacing: "-0.04144rem",
          }}
        />
        <Chip
          text="Moderately Aggresive"
          sx={{
            backgroundColor: "var(--gray-100)",
            fontWeight: "400",
            padding: "0.09rem 0.37rem",
          }}
        />
      </Stack>

      <CustomDivider sx={{ mt: "0.78rem", mb: "0.87rem" }} />

      {/* <ComparePieGraph  /> */}

      <CustomDivider sx={{ mt: "0.78rem", mb: "0.87rem" }} />

      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        {riskFeeRatioYield.map((risk, index) => (
          <Stack key={index} sx={{ gap: "0.31rem" }}>
            <TextXs text={risk.name} sx={{ color: "var(--text-secondary)" }} />
            <TextXs text={risk.value} sx={{ fontWeight: "600" }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default CompareMetrices;
