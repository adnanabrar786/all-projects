import { Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { ICompareProposalRisk } from "interfaces/proposal";

interface Props {
  risk: ICompareProposalRisk;
}

const RiskValues = ({
  value,
  transparent,
  scoreCard,
}: {
  value: string;
  transparent?: boolean;
  scoreCard?: boolean;
}) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: transparent ? "transparent" : "var(--gray-100)",
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
          backgroundColor: scoreCard ? "#F3D4F6" : "transparent",
          borderRadius: "0.25rem",
        }}
      >
        <TextXs
          sx={{
            fontWeight: scoreCard ? "700" : "400",
            lineHeight: "1.5rem",
            fontSize: scoreCard ? "1rem" : "0.8rem",
            filter: scoreCard ? "blur(5px)" : "none",
          }}
          text={value}
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
  );
};

const RiskValue = ({ risk }: Props) => {
  return (
    <>
      <Stack
        sx={{
          marginTop: "2rem",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
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
            text=""
          />
        </Stack>

        <RiskValues value={"0"} scoreCard />
        <RiskValues transparent value={risk.risk_profile} />
        <RiskValues value={risk.risk_need} />
        <RiskValues transparent value={risk.risk_perception} />
        <RiskValues value={risk.risk_tolerance} />

        {/* <Stack
          sx={{
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "var(--gray-100)",
            paddingLeft: "2rem",
            height: "3rem",

            justifyContent: "center",
          }}
        ></Stack> */}
      </Stack>
    </>
  );
};

export default RiskValue;
