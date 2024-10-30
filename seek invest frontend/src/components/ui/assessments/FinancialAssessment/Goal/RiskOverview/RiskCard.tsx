import { Stack } from "@mui/material";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { InfoCircleIcon } from "constants/images.routes";
import { FINANCIALRISKCARD } from "enums/enums";
import useClientByIdData from "hooks/useClientByIdData";
import { IComplianceResult } from "interfaces/assessment";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Props {
  complianceResult: IComplianceResult;
}

const RiskCard = ({ complianceResult }: Props) => {
  const params = useParams();

  const [assessmentId, firmName, clientName, assessmentName, clientId] =
    params.app as string[];

  const { client } = useClientByIdData(clientId);

  const financialRiskCard: FINANCIALRISKCARD[] = [
    {
      title: "Advisory fee",
      value:
        client && !client.advisor_fee
          ? "-"
          : client
          ? `${client.advisor_fee}%`
          : "",
      bg: "var(--purple-light2)",
    },
    {
      title: "Expense ratio",
      value: "",
      bg: "var(--water-blue)",
    },
    {
      title: "Dividend yield",
      value: "",
      bg: "var(--text-light-success)",
    },
  ];

  return (
    <Stack
      direction={"row"}
      sx={{
        marginTop: "0.5rem",
        gap: "0.5rem",
      }}
    >
      {financialRiskCard.map((item, index) => (
        <Stack
          key={index}
          sx={{
            width: "18.9rem",
            maxWidth: "18.8rem",
            height: "6.61rem",
            backgroundColor: item.bg,
            padding: "1rem 1.6rem",
            borderBottomLeftRadius: index === 0 ? "1rem" : "0rem",
            borderBottomRightRadius: index === 2 ? "1rem" : "0rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              gap: "0.25rem",
              borderBottom: "1px solid black",
              alignItems: "center",
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                fontWeight: "500",
              }}
              text={item.title}
            />
            <Image
              priority
              src={InfoCircleIcon}
              alt={"icon"}
              width={12}
              height={12}
            />
          </Stack>

          <TextMd
            sx={{
              marginTop: "1rem",
              filter: item.value ? "blur(0)" : "blur(0.3rem)",
              fontSize:
                client && client.advisor_fee === null ? "2rem" : "1.125rem",
            }}
            text={item.value ? item.value : "-"}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default RiskCard;
