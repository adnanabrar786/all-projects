import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Chip from "components/common/Chip/Chip";
import Image from "next/image";
import Link from "next/link";

interface Props {
  index?: number;
  open: boolean;
  activeItem?: string;
  setSelectedSubmenuItem: (value: string) => void;
  drawerItem: {
    item: string;
    link: string;
    icon: string;
    activeIcon: string;
    disable?: boolean;
  };
}
const SidebarItem = ({
  open,
  drawerItem,
  activeItem,
  setSelectedSubmenuItem,
  index,
}: Props) => {
  return (
    <Link
      href={drawerItem.link}
      onClick={(e) => {
        setSelectedSubmenuItem("");
        if (drawerItem.disable) {
          e.preventDefault();
        }
      }}
    >
      <ListItem
        sx={
          drawerItem.item === activeItem
            ? {
                backgroundColor: "var(--gray-200)",
                borderRadius: "0.375rem",
                border: "1px solid var(--gray-300)",
                width: open ? "85%" : "100%",
                mt: index !== 0 ? "0.75rem" : "0",
              }
            : {
                width: open ? "85%" : "100%",
                mt: index !== 0 ? "0.75rem" : "0",
              }
        }
        key={drawerItem.item}
        disablePadding
      >
        <ListItemButton
          disableRipple
          sx={{
            borderRadius: "0.375rem",
            justifyContent: open ? "initial" : "center",
            height: "2rem",
            cursor: drawerItem.disable ? "not-allowed" : "pointer",
            ":hover": {
              backgroundColor: drawerItem.disable
                ? "transparent"
                : drawerItem.item === activeItem
                ? "var(--gray-200)"
                : "var(--gray-100)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              opacity: drawerItem.disable ? "0.5" : "1",
              minWidth: 0,
              mr: open ? 1 : "auto",
              justifyContent: "center",
            }}
          >
            <Image
              priority
              src={
                drawerItem.item === activeItem
                  ? drawerItem.activeIcon
                  : drawerItem.icon
              }
              alt={"icon"}
              width={20}
              height={21}
            />
          </ListItemIcon>

          {open && (
            <Stack direction="row" sx={{ alignItems: "center", gap: "1rem" }}>
              <ListItemText
                primary={drawerItem.item}
                primaryTypographyProps={{
                  fontSize: "0.8125rem",
                  fontWeight: "500",
                }}
                sx={{
                  opacity: open ? (drawerItem.disable ? 0.5 : 1) : 0,
                  color: "var(--text-primary)",
                }}
              />
              {drawerItem.disable && (
                <Chip
                  text="Coming soon"
                  sx={{
                    backgroundColor: "var(--gray-100)",
                    color: "var(--text-secondary)",
                    fontSize: "0.5rem",
                  }}
                />
              )}
            </Stack>
          )}
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
