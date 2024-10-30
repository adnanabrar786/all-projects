import { Stack } from "@mui/material";
import IconText from "components/common/IconText";
import HeadingXl from "components/common/Text/HeadingXl";
import TextXs from "components/common/Text/TextXs";
import {
  CoinStackIcon,
  UserRoundFilledIcon,
  WalletFilledIcon,
} from "constants/images.routes";
import useClientOverviewData from "hooks/useClientsOverviewData";
import { ReactNode } from "react";
import { formattedNumberToDecimal } from "utils/maths";

interface Props {
  children: ReactNode;
}

const ClientsLayout = ({ children }: Props) => {
  const { clientOverview } = useClientOverviewData();

  const clientOverViewArr = [
    {
      icon: UserRoundFilledIcon,
      text: "Clients",
      secondaryText: clientOverview ? clientOverview.clients : "0",
      bgColor: "var(--lavender)",
      borderLeft: true,
    },
    {
      icon: WalletFilledIcon,
      text: "Accounts",
      secondaryText: clientOverview ? clientOverview.accounts : "0",
      bgColor: "var(--water-blue)",
    },
    {
      icon: CoinStackIcon,
      text: "AUM",
      secondaryText: `$${
        clientOverview ? formattedNumberToDecimal(clientOverview.aum) : "0"
      }`,
      bgColor: "var(--cosmic-latte)",
      borderRight: true,
    },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.6rem",
          paddingX: "2rem",
        }}
      >
        <HeadingXl text="Clients" sx={{}} />

        <Stack direction={"row"} sx={{ gap: "0.5rem" }}>
          {clientOverViewArr.map((overview, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                alignItems: "center",
                backgroundColor: "var(--ghost-white)",
                border: "1px solid var(--gray-300)",
                borderRadius: "0.25rem",
                padding: "0.38rem 0.88rem",
                gap: "0.7rem",
              }}
            >
              <IconText
                text={overview.text}
                icon={overview.icon}
                iconWidth={14}
                iconHeight={14}
                sxText={{
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
                }}
              />
              <TextXs
                text={`${overview.secondaryText}`}
                sx={{
                  lineHeight: "1.25rem",
                  fontWeight: "700",
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack sx={{ paddingX: "2rem", paddingBottom: "2rem", mt: "1.7rem" }}>
        {children}
      </Stack>
    </>
  );
};

export default ClientsLayout;
