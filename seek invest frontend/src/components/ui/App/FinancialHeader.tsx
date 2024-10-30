import { Stack } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXl from "components/common/Text/TextXl";
import { FinancialAssessmentIcon } from "constants/images.routes";
import Image from "next/image";

interface Props {
  title: string;
}

const FinancialHeader = ({ title }: Props) => {
  return (
    <>
      <Stack
        sx={{
          alignSelf: "center",
          padding: "1.44rem 0 1.33rem 0rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <TextMd
          text={title}
          sx={{
            color: "var(--text-primary)",
            fontSize: "1.25rem",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "1.875rem",
            textAlign: "center",
          }}
        />
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <TextXl
            text="POWERED BY SEEKINVEST"
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.125rem",
              textAlign: "center",
            }}
          />
          <Image
            priority
            src={FinancialAssessmentIcon}
            alt={"icon"}
            width={12}
            height={12}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default FinancialHeader;
