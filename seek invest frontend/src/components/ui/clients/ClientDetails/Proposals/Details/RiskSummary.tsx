import { Stack } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";

const risks = [
  "Risk Score",
  "Client Risk Profile",
  "Risk Need",
  "Risk Perception",
  "Risk Tolerance",
];

const RiskSummary = () => {
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
          }}
        >
          <TextMd
            sx={{
              fontWeight: "700",
              lineHeight: "1.75rem",
              height: "3rem",
              paddingLeft: "2rem",
            }}
            text="Risk"
          />
        </Stack>

        {risks.map((risk, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor:
                index % 2 === 1 ? "transparent" : "var(--gray-100)",
              paddingLeft: "2rem",
              height: "3rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <TextXs
                sx={{
                  fontWeight: "600",
                  lineHeight: "1.25rem",
                }}
                text={risk}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default RiskSummary;
