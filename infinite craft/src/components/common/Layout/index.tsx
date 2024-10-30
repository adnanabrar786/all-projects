"use client";
import MyProfileBar from "@/app/components/MyProfileBar";
import DashboardIcon from "@/assets/icons/Dashboard.svg";
import SavePrompts from "@/assets/icons/SavePrompts.svg";
import SidebarProfile from "@/assets/icons/SidebarProfile.svg";
// import FullLogo from '@/assets/icons/fulllogo.svg';
import ToggleDarkMode from "@/app/components/toggleDarkMode";
import Logo from "@/assets/icons/logo.svg";
import ProfileLogo from "@/assets/icons/profile.svg";
import SubscriptionIcon from "@/assets/icons/subscription.svg";
import TopBar from "@/assets/icons/topbar.svg";
import WhiteDashboardIcon from "@/assets/icons/whiteDashboard.svg";
import _FullLogo from "@/assets/images/FullLogo.png";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import {
  DASHBOARD_URL,
  LIBRARY_PAGE_URL,
  PROFILE_URL,
  ROOT_URL,
  SAVE_PROMPT_URL,
  SUBSCRIPTION_PAGE_URL,
} from "@/routes";
import { Dashboard } from "@/utils/enums";
import { Colors } from "@/utils/enums/colors";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Auth from "../Auth/Auth";
import LogoutButton from "../LogoutButton";
import MobileSidebar from "../mobilesidebar";
import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export const metadata = {
  title: "Dashboard | Infinite Craft",
  description: "Dashboard | Infinite Craft",
};

const DRAWER_WIDTH = 240;

const LINKS = [
  {
    text: "Dashboard",
    href: DASHBOARD_URL,
    icon: DashboardIcon,
    activeIcon: WhiteDashboardIcon,
    mobileIcon: <DashboardOutlinedIcon />,
  },
  {
    text: "Profile",
    href: PROFILE_URL,
    icon: ProfileLogo,
    activeIcon: SidebarProfile,
    mobileIcon: <AccountCircleOutlinedIcon />,
  },
  {
    text: "Save Prompts",
    href: SAVE_PROMPT_URL,
    icon: SavePrompts,
    activeIcon: SavePrompts,
    mobileIcon: <DvrOutlinedIcon />,
  },
  {
    text: "Subscription",
    href: SUBSCRIPTION_PAGE_URL,
    icon: SubscriptionIcon,
    activeIcon: SubscriptionIcon,
    mobileIcon: <DiamondOutlinedIcon />,
  },
];
interface Props {
  children: React.ReactNode;
}

Amplify.configure({
  ...config,
  ssr: true,
});

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  // const { theme, setTheme } = useTheme();
  const isDashboard =
    pathname.includes(Dashboard.DASHBOARD) ||
    pathname.includes(Dashboard.PROFILE) ||
    pathname.includes(Dashboard.SAVEPROMPT) ||
    pathname.includes(Dashboard.SUBSCRIPTION);

  const activeLink = pathname.replace("/", "").replace("-", " ");

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ThemeRegistry>
              <>
                <Auth />
                {pathname === ROOT_URL || pathname === LIBRARY_PAGE_URL ? (
                  children
                ) : (
                  <Box
                    sx={{
                      backgroundColor: "var(--backgroundwhite)",
                    }}
                  >
                    <Drawer
                      sx={{
                        width: DRAWER_WIDTH,
                        display: { xs: "none", lg: "flex" },
                        flexShrink: 0,
                        // "& .MuiDrawer-root": {
                        //   padding:0,
                        //   margin:0,
                        // },
                        "& .MuiDrawer-paper": {
                          width: DRAWER_WIDTH,
                          boxSizing: "border-box",
                          // height: "auto",
                          bottom: 0,
                          // backgroundColor: Colors.GHOST_WHITE,
                          backgroundColor: "var(--backgroundsidebar)",
                        },
                      }}
                      variant="permanent"
                      anchor="left"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          padding: "1rem",
                          width: "10.15294rem",
                          height: "4.23925rem",
                        }}
                      >
                        <Link href={ROOT_URL}>
                          <Image src={_FullLogo} alt={"logo image"} />
                          {/* <Image></Image> */}
                        </Link>
                      </Box>
                      <Stack
                        sx={{
                          backgroundColor: "var(--backgroundsidebar)",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <List>
                          {LINKS.map(
                            ({
                              text,
                              href,
                              icon: Icon,
                              activeIcon: ActiveIcon,
                              mobileIcon,
                            }) => (
                              <ListItem
                                key={href}
                                disablePadding
                                sx={{
                                  marginY: "1.375rem",
                                  backgroundColor:
                                    pathname === href
                                      ? Colors.ZOMP
                                      : "transparent",
                                  // color:
                                  //   pathname === href
                                  //     ? Colors.WHITE
                                  //     : Colors.RAISIN_BLACK,
                                  color:
                                    pathname === href
                                      ? Colors.WHITE
                                      : "var(--textWhite)",
                                  // color: 'var(--textWhite)',
                                }}
                              >
                                <ListItemButton component={Link} href={href}>
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

                        <LogoutButton />
                        {/* <List sx={{ width: "100%" }}>
                    {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                      <ListItem key={text} disablePadding onClick={() => {
                        const dispatch = useDispatch()
                        dispatch(
                          setUserDetails({
                            isLogin: true,
                            id: null,
                            email: null,
                            key: null,
                          }),
                        );
                      }} >
                        <ListItemButton component={Link} href={ROOT_URL}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.688rem",
                              marginLeft: "0.6rem",
                            }}
                          >
                            <Icon />
                            <ListItemText primary={text} />
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List> */}
                      </Stack>
                    </Drawer>

                    <Box
                      sx={{
                        width: "100%",
                        height: "5rem",
                        gap: "0rem",
                        // backgroundColor: Colors.WHITE,
                        backgroundColor: "var(--backgroundwhite)",
                        display: { xs: "flex", lg: "none" },
                        alignItems: "center",
                        // justifyContent: { xs: "space-between", sm: "start" },
                        justifyContent: { xs: "start", sm: "start" },
                        // marginTop: '0.6rem',
                        paddingLeft: "0.813rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          // justifyContent: 'space-between',
                          gap: "1rem",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                          }}
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          <TopBar />
                        </Box>
                        <Box>
                          <Logo />
                        </Box>

                        <MyProfileBar />
                      </Box>
                      <Box
                        sx={{
                          display: { xs: "flex", sm: "none" },
                          marginRight: "1.3rem",
                        }}
                      >
                        {/* <Settings /> */}
                      </Box>
                      {/* <Button
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                  >
                    {theme === 'dark' ? (
                      <DarkModeIcon
                        sx={{
                          color: 'var(--textWhite)',
                          marginRight: '0.3rem',
                        }}
                      />
                    ) : (
                      <LightModeIcon
                        sx={{
                          color: '#2D969B',
                          marginRight: '0.3rem',
                        }}
                      />
                    )}
                  </Button> */}
                    </Box>

                    <MobileSidebar
                      linksList={LINKS}
                      open={isOpen}
                      handleClose={() => {
                        setOpen(false);
                      }}
                    />

                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        backgroundColor: "var(--dashboard-white)",
                        // bgcolor: 'var(--white)',
                        ml: { xs: "0rem", lg: `${DRAWER_WIDTH}px` },
                        minHeight: "100vh",
                        // marginTop: '-14px',
                        // mt: ["48px", "56px", "64px"],
                        // p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: { lg: "flex", xs: "none" },
                          height: "90px",
                          paddingRight: "25px",
                          // paddingLeft: '25px',
                          boxShadow: "var(--boxshadowcolor)",
                          alignItems: "center",
                          justifyContent: "space-between",
                          // marginTop: "-9px",
                          // backgroundColor: 'var(--backgroundsidebar)',
                        }}
                      >
                        <Typography
                          sx={{
                            color: "var(--textWhite)",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            paddingLeft: "1rem",
                          }}
                        >
                          {activeLink}
                        </Typography>

                        <ToggleDarkMode bgcolor="var(--backgroundwhite)" />
                      </Box>
                      {children}
                    </Box>
                  </Box>
                )}
              </>
            </ThemeRegistry>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
