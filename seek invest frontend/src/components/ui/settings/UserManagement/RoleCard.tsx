import { ListItemButton, SxProps } from "@mui/material";
import MenuCard from "components/common/Card/MenuCard";
import IconText from "components/common/IconText";
import { ChevronDownSecondaryIcon } from "constants/images.routes";
import { ERoles } from "enums/enums";

interface Props {
  roles: string[];
  role: string;
  openMenu: boolean;
  sxMenuCard?: SxProps;
  currentRole: string;
  setCurrentRole: (currentRole: string) => void;
  updateCurrentRole?: (value: string) => void;
  deleteUser?: () => void;
}

const RoleCard = ({
  role,
  openMenu,
  roles,
  sxMenuCard,
  currentRole,
  setCurrentRole,
  updateCurrentRole,
  deleteUser,
}: Props) => {
  return (
    <>
      <IconText
        sxRow={{
          cursor: "pointer",
          flexDirection: "row-reverse",
          gap: "0.25rem",
          width: "fit-content",
        }}
        sxText={{ color: "var(--text-secondary)" }}
        text={currentRole}
        icon={role !== ERoles.OWNER ? ChevronDownSecondaryIcon : ""}
        iconHeight={20}
        iconWidth={20}
      />

      {openMenu && (
        <MenuCard
          sx={{
            left: "10px",
            right: "auto",
            minWidth: "8rem",
            top: "50px",
            ...sxMenuCard,
          }}
        >
          {roles?.map((value, index) => (
            <ListItemButton
              key={value}
              onClick={() => {
                if (value === ERoles.REMOVE_USER && deleteUser) {
                  return deleteUser();
                }

                setCurrentRole(value);

                if (updateCurrentRole) {
                  updateCurrentRole(value);
                }
              }}
              sx={{
                fontSize: "0.8125rem",
                paddingY: "0.8rem",
                minWidth: "10rem",
                color:
                  value === ERoles.REMOVE_USER
                    ? "var(--carnelian)"
                    : "var(--text-secondary)",
              }}
            >
              {value}
            </ListItemButton>
          ))}
        </MenuCard>
      )}
    </>
  );
};

export default RoleCard;
