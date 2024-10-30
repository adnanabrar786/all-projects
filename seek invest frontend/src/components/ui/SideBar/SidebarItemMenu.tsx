import { Collapse, Stack } from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import IconText from "components/common/IconText";
import {
  CompassIcon,
  EditPencilIcon,
  NotificationBoxIcon,
  SpeedometerIcon,
} from "constants/images.routes";
import { TEMPLATE_ASSESSMENT } from "enums/assessment";
import Link from "next/link";
import { useState } from "react";

const { VALUES_ASSESSMENT, RISK_ASSESSMENT } = TEMPLATE_ASSESSMENT;

interface Props {
  open: boolean;
  text: string;
  menuItems: Array<{ title: string; link: string }>;
  setSelectedSubmenuItem: (value: string) => void;
  setIsSubMenu: (value: boolean) => void;
}

const SidebarItemMenu = ({
  text,
  menuItems,
  open,
  setSelectedSubmenuItem,
  setIsSubMenu,
}: Props) => {
  const [openNewAssessment, setOpenNewAssessment] = useState(false);

  return (
    <Stack
      sx={{ position: "relative", alignItems: open ? "initial" : "center" }}
    >
      <IconText
        text={open ? text : ""}
        icon={NotificationBoxIcon}
        iconWidth={20}
        iconHeight={21}
        onClick={() => setOpenNewAssessment(!openNewAssessment)}
        sxRow={{
          cursor: "pointer",
          flexDirection: "row-reverse",
          backgroundColor: "white",
          borderRadius: "0.375rem",
          border: "1px solid var(--gray-300)",
          padding: "0.5rem 0.7rem",
          width: "fit-content",
          gap: open ? "0.5rem" : "0",
        }}
      />

      <Collapse
        in={openNewAssessment}
        sx={{ mt: "0.25rem" }}
        onMouseEnter={() => setIsSubMenu(true)}
        onMouseLeave={() => setIsSubMenu(false)}
      >
        <MenuCard
          sx={{
            border: "1px solid var(--gray-300)",
            alignItems: open ? "initial" : "center",
            justifyContent: open ? "initial" : "center",
            position: "initial",
            boxShadow: "none",
          }}
        >
          {menuItems.map((menuItem) => {
            let icon = EditPencilIcon;

            switch (menuItem.title) {
              case VALUES_ASSESSMENT:
                icon = CompassIcon;
                break;
              case RISK_ASSESSMENT:
                icon = SpeedometerIcon;
                break;
            }
            return (
              <CustomTooltip
                key={menuItem.title}
                title={!open && menuItem.title}
                placement="right"
                arrow
              >
                <Link
                  href={menuItem.link}
                  onClick={() => {
                    setOpenNewAssessment(false);
                    setSelectedSubmenuItem(menuItem.title);
                  }}
                >
                  <IconText
                    key={menuItem.title}
                    text={open ? menuItem.title : ""}
                    icon={icon}
                    iconWidth={16}
                    iconHeight={17}
                    sxRow={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                      gap: open ? "0.5rem" : "0",
                      padding: "0.5rem 0.85rem",
                      width: "100%",
                    }}
                  />
                </Link>
              </CustomTooltip>
            );
          })}
        </MenuCard>
      </Collapse>
    </Stack>
  );
};

export default SidebarItemMenu;
