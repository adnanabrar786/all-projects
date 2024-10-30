import { IconButton, Stack } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import Content from "components/ui/SideBar/Content";
import { ChevronDarkRightIcon } from "constants/images.routes";
import Head from "next/head";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { getDrawerOpen } from "utils/token";

const drawerWidth = "16.0625rem";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 16px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 16px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type AppbarDrawerProps = {
  heading?: string;
  children: ReactNode;
};

export default function AppLayout({ heading, children }: AppbarDrawerProps) {
  const drawerOpen = getDrawerOpen();
  const [open, setOpen] = useState(drawerOpen);

  return (
    <>
      {heading && (
        <Head>
          <title>{heading}</title>
        </Head>
      )}
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            borderColor: "var(--color-gray-200, #EAECF0)",
            backgroundColor: "var(--color-gray-50, #F9FAFB)",
          },
        }}
      >
        <IconButton
          aria-label="open drawer"
          onClick={() => {
            localStorage.setItem("open", JSON.stringify(!open));
            setOpen(!open);
          }}
          edge="start"
          sx={{
            overflow: "visible",
            backgroundColor: "white",
            border: "1px solid var(--gray-300)",
            ":hover": {
              backgroundColor: "white",
            },
            padding: "0.44rem",
            width: "1.68rem",
            height: "1.68rem",
            color: "white",
            left: open ? "255px" : "82px",
            top: 80,
            zIndex: "1000000000",
            position: "fixed",
            alignSelf: "flex-end",
            transition: "all 0.3s ease",
            img: {
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "all 0.5s ease",
            },
          }}
        >
          <Image
            priority
            src={ChevronDarkRightIcon}
            alt={"icon"}
            width={13}
            height={14}
          />
        </IconButton>

        <Content open={open} />
      </Drawer>

      <Stack
        component="main"
        sx={{
          alignItems: "initial",
          flexGrow: 1,
          backgroundColor: "var(--background-color2)",
          minHeight: "100vh",
        }}
      >
        <Stack
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Stack>
      </Stack>
    </>
  );
}
