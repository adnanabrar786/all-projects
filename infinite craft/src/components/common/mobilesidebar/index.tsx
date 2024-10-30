import { LinkItem } from "@/interface/sidebar";
import { ROOT_URL } from "@/routes";
import { Colors } from "@/utils/enums/colors";

import Logout from "@mui/icons-material/Logout";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomDrawer from "../CustomDrawer";

type MobileSidebarProps = {
  handleClose: () => void;
  open: boolean;
  linksList: LinkItem[];
};

export default function MobileSidebar({
  handleClose,
  open,
  linksList,
}: MobileSidebarProps) {
  const pathname = usePathname();
  const PLACEHOLDER_LINKS = [{ text: "Logout", icon: <Logout /> }];
  return (
    <CustomDrawer handleClose={handleClose} open={open}>
      <Stack
        sx={{
          backgroundColor: "var(--backgroundsidebar)",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <List>
          {linksList.map(
            ({ text, href, mobileIcon, activeIcon: ActiveIcon }) => (
              <ListItem
                key={href}
                disablePadding
                sx={{
                  backgroundColor:
                    pathname === href ? Colors.ZOMP : "transparent",
                  // color: pathname === href ? Colors.WHITE : Colors.RAISIN_BLACK,
                  color: pathname === href ? Colors.WHITE : "var(--textWhite)",
                  // color: 'var(--textWhite)',

                  marginY: "1.375rem",
                }}
              >
                <ListItemButton
                  component={Link}
                  href={href}
                  onClick={handleClose}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.688rem",
                      marginLeft: "0.6rem",
                    }}
                  >
                    {mobileIcon}
                    <ListItemText primary={text} />
                  </Box>
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        <List>
          {PLACEHOLDER_LINKS.map(({ text, icon }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ a: { textDecoration: "none", color: "var(--textWhite)" } }}
            >
              <ListItemButton component={Link} href={ROOT_URL}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.688rem",
                    marginLeft: "0.6rem",
                  }}
                >
                  {icon}
                  <ListItemText primary={text} />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </CustomDrawer>
  );
}
