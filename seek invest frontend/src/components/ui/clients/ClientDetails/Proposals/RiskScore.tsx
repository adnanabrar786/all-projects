import { Stack } from "@mui/material";
import ScoreCard from "components/common/Card/ScoreCard";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import { riskFeeRatioYield, riskPersonData } from "constants/data";
import { InfoCircleIcon } from "constants/images.routes";

const RiskScore = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ mt: "1.63rem", mb: "3rem", alignItems: "flex-start" }}
    >
      <ScoreCard
        text={"70"}
        subText={"Risk Score"}
        sx={{
          bgcolor: "var(--shampoo)",
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
      <Stack
        direction={"row"}
        sx={{
          ml: "2.5rem",
          width: "100%",
          gap: "1rem",
        }}
      >
        <TextXs
          text="RISK PERSONA"
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textAlign: "center",
          }}
        />
        <Stack sx={{ width: "50%", gap: "0.5rem" }}>
          {riskPersonData.map((profile, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                borderBottom: "1px solid var(--text-secondary)",
                padding: "0.5rem 0",
                justifyContent: "space-between",
                ">p": {
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                },
              }}
            >
              <TextXs text={profile.title} />
              <TextXs text={profile.status} sx={{ fontWeight: "600" }} />
            </Stack>
          ))}
        </Stack>

        <Stack sx={{ width: "50%", gap: "0.5rem" }}>
          {riskFeeRatioYield.map((profile, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                borderBottom: "1px solid var(--text-secondary)",
                padding: "0.5rem 0",
                justifyContent: "space-between",
                "& p": {
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                },
              }}
            >
              <IconText
                icon={InfoCircleIcon}
                iconWidth={12}
                iconHeight={13}
                text={profile.name}
                sxRow={{
                  flexDirection: "row-reverse",
                  img: { cursor: "pointer" },
                }}
              />
              <TextXs
                text={profile.value}
                sx={{
                  fontWeight: "600",
                  filter: index === 0 ? "none" : "blur(5px)",
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RiskScore;
