import { Skeleton, Stack } from "@mui/material";
import CircleChip from "components/common/Chip/CircleChip";
import CustomDivider from "components/common/Divider/CustomDivider";
import GoBackButton from "components/common/GoBackButton";
import TabIconText from "components/common/TabIconText";
import TextMd from "components/common/Text/TextMd";
import {
  CLIENTS_OVERVIEW,
  CLIENT_DETAIL_ACCOUNTS,
  CLIENT_DETAIL_ASSESSMENTS,
  CLIENT_DETAIL_PROPOSALS,
  CLIENT_DETAIL_SUMMARY,
} from "constants/pages.routes";
import useClientAccountCount from "hooks/useClientAccountCount";
import useClientByIdData from "hooks/useClientByIdData";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const ClientDetailsLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const { clientId }: { clientId: string } = useParams();
  const { client } = useClientByIdData();
  const { accountCount } = useClientAccountCount(clientId as string);

  const tabs = [
    { name: "Summary", link: CLIENT_DETAIL_SUMMARY({ clientId }) },
    {
      name: "Assessments",
      link: CLIENT_DETAIL_ASSESSMENTS({ clientId }),
    },
    {
      name: "Accounts",
      link: CLIENT_DETAIL_ACCOUNTS({ clientId }),
      total: accountCount?.toString() ?? "0",
    },
    {
      name: "Proposals",
      link: CLIENT_DETAIL_PROPOSALS({ clientId }),
      disabled: false,
    },
  ];

  return (
    <Stack sx={{ width: "1150px" }}>
      <Stack
        sx={{
          marginLeft: "2rem",
          marginTop: "3rem",
          a: { width: "fit-content" },
        }}
      >
        <GoBackButton text="Back to Clients" url={CLIENTS_OVERVIEW} />

        {client ? (
          <TextMd
            text={`${client.first_name} ${client.last_name}`}
            sx={{ mt: "0.25rem", fontWeight: "700", lineHeight: "1.75rem" }}
          />
        ) : (
          <Skeleton width={"10rem"} />
        )}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ gap: "1.5rem", paddingX: "2rem", marginTop: "2.25rem" }}
      >
        {tabs.map((tab, index) => {
          let isActiveTab = pathname.includes(tab.link);

          return (
            <Link
              href={tab.disabled ? "#" : tab.link}
              key={index}
              style={{
                borderBottom: isActiveTab
                  ? "2px solid var(--primary)"
                  : "2px solid transparent",
              }}
            >
              <TabIconText
                sx={{
                  cursor: tab.disabled ? "context-menu" : "pointer",
                }}
                disable={tab.disabled}
                text={tab.name}
                activeText={isActiveTab}
                sxText={{ paddingX: "0.25rem" }}
                endIcon={
                  tab.total && (
                    <CircleChip text={tab.total} isActiveTab={isActiveTab} />
                  )
                }
              />
            </Link>
          );
        })}
      </Stack>

      <CustomDivider
        sx={{
          marginBottom: "2.56rem",
          marginRight: "2rem",
          marginLeft: "1rem",
        }}
      />

      <Stack sx={{ paddingX: "2rem", paddingBottom: "2rem" }}>{children}</Stack>
    </Stack>
  );
};

export default ClientDetailsLayout;
