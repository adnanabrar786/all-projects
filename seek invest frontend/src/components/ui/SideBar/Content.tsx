import { Box, List, Stack } from "@mui/material";
import AvatarTitleRow from "components/common/AvatarTitleRow";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import CustomDivider from "components/common/Divider/CustomDivider";
import Settings from "components/ui/SideBar/Settings";
import SidebarAd from "components/ui/SideBar/SidebarAd";
import SidebarItem from "components/ui/SideBar/SidebarItem";
import {
  ChevronVerticalIcon,
  ClientOutlinedIcon,
  ClientsFilledIcon,
  ColoredLogoIcon,
  FHAsFilledIcon,
  FHAsOutlinedIcon,
  Logo,
  ModelFilledIcon,
  ModelOutlinedIcon,
} from "constants/images.routes";
import { CLIENTS_OVERVIEW, FHAS, MODELS } from "constants/pages.routes";
import { useUserContext } from "context/user/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveItem } from "utils/activeItems";

interface Props {
  open: boolean;
}
const Content = ({ open }: Props) => {
  const pathname = usePathname();

  const activeItem = getActiveItem(pathname);
  const { user } = useUserContext();
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState("");
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [showAd, setShowAd] = useState(true);

  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowName(true);
      }, 200);
    } else {
      setShowName(false);
    }
  }, [open]);

  const drawerItems = [
    {
      item: "Clients",
      link: CLIENTS_OVERVIEW,
      icon: ClientOutlinedIcon,
      activeIcon: ClientsFilledIcon,
    },
    {
      item: "Assessments",
      link: FHAS,
      icon: FHAsOutlinedIcon,
      activeIcon: FHAsFilledIcon,
    },
    {
      item: "Models",
      link: MODELS,
      icon: ModelOutlinedIcon,
      activeIcon: ModelFilledIcon,
      disable: false,
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: "2rem 1.25rem 0 1.5rem",
        }}
      >
        <Link href={CLIENTS_OVERVIEW}>
          <Image
            priority
            src={open ? ColoredLogoIcon : Logo}
            alt="Logo Image"
            width={open ? 122 : 23}
            height={open ? 24 : 23}
          />
        </Link>
      </Box>

      <Stack
        sx={{
          justifyContent: "space-between",
          height: "100%",
          paddingX: "0.85rem",
          paddingTop: "0.5rem",
        }}
      >
        <List
          sx={{
            paddingBottom: "0.1rem",
            a: !open
              ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {},
          }}
        >
          {drawerItems.map((drawerItem, index) => (
            <CustomTooltip
              key={drawerItem.item}
              title={isSubMenu ? "" : !open && drawerItem.item}
              placement="right"
              arrow
            >
              <Box>
                <SidebarItem
                  setSelectedSubmenuItem={setSelectedSubmenuItem}
                  open={open}
                  activeItem={activeItem}
                  drawerItem={drawerItem}
                  index={index}
                />
              </Box>
            </CustomTooltip>
          ))}
        </List>

        <Stack
          sx={{
            paddingBottom: "1.5rem",
            gap: "0.481rem",
            justifyContent: "flex-end",
          }}
        >
          {!settingsMenu && open && (
            <CustomDivider
              sx={{
                marginY: "0.2rem",
              }}
            />
          )}

          {open && settingsMenu && showName && (
            <SidebarAd showAd={showAd} setShowAd={setShowAd} />
          )}

          {user && (
            <Stack
              direction={open ? "row" : "column"}
              onClick={() => setSettingsMenu(!settingsMenu)}
              sx={{
                img: { cursor: "pointer" },
                gap: open ? "0" : "1rem",
              }}
            >
              <AvatarTitleRow
                avatar={user?.profile || ""}
                title={open ? `${user?.first_name} ${user?.last_name}` : ""}
                secText={open ? user?.email : ""}
                open={open}
                showName={showName}
              />
              {open && showName && (
                <Image
                  priority
                  src={ChevronVerticalIcon}
                  alt={"icon"}
                  width={20}
                  height={20}
                />
              )}
            </Stack>
          )}

          {settingsMenu && (
            <Settings
              open={open}
              setSelectedSubmenuItem={setSelectedSubmenuItem}
              showName={showName}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Content;
