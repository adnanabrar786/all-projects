import { Stack } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import TabIconText from "components/common/TabIconText";
import {
  COMPANY_SETTINGS,
  PERSONAL_SETTINGS,
  PLANS_AND_BILLING,
  USER_MANAGEMENT,
} from "constants/pages.routes";
import { useUserContext } from "context/user/UserContext";
import { IClientTabs } from "interfaces/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const { user } = useUserContext();

  const _renderTabs = () => {
    const main_tab = {
      name: "Personal Settings",
      link: PERSONAL_SETTINGS,
    };

    let additionalTabs: IClientTabs[] = [];

    switch (user?.role) {
      case "OWNER":
        additionalTabs = [
          { name: "Workspace", link: COMPANY_SETTINGS },
          { name: "Plan and Billing", link: PLANS_AND_BILLING },
          { name: "User Management", link: USER_MANAGEMENT },
        ];
        break;
      case "ADMIN":
        additionalTabs = [{ name: "User Management", link: USER_MANAGEMENT }];
        break;
      default:
        break;
    }

    const tabs: { name: string; link: string }[] = [
      main_tab,
      ...additionalTabs,
    ];

    return tabs.map((tab) => {
      let isActiveTab = pathname.includes(tab.link);
      return (
        <Link
          href={tab.link}
          key={tab.name}
          style={{
            borderBottom: isActiveTab
              ? "2px solid var(--primary)"
              : "2px solid transparent",
          }}
        >
          <TabIconText
            text={tab.name}
            activeText={isActiveTab}
            sxText={{ paddingX: "0.25rem" }}
          />
        </Link>
      );
    });
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "2.69rem",
          paddingX: "1.88rem",
          ".notificationIcon": {
            cursor: "pointer",
          },
        }}
      >
        <Stack direction={"row"} sx={{ gap: "1.5rem" }}>
          {_renderTabs()}
        </Stack>
      </Stack>

      <CustomDivider
        sx={{
          marginBottom: "3.19rem",
          marginLeft: "1rem",
          maxWidth: "1055px",
        }}
      />

      <Stack
        sx={{ paddingX: "2rem", paddingBottom: "4rem", maxWidth: "1008px" }}
      >
        {children}
      </Stack>
    </>
  );
};

export default SettingsLayout;
