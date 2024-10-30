"use client";

import AppbarSvg from "@/assets/icons/appbar.svg";
import SignInModal from "@/components/common/SignInModal";
import SignUpModal from "@/components/common/SignUpModal";
import { useAppSelector } from "@/hooks/reduxHooks";
import useAuth from "@/hooks/useAuth";
import { RootState } from "@/store";
import { setUserDetails } from "@/store/slices/authSlice";
import { setIsOpen } from "@/store/slices/imageSlice";
import { Colors } from "@/utils/enums/colors";
import { Box, Drawer, List, Stack } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButtons from "./HeaderButtons";
import AppbarIcons from "./HeaderIcons";
import AppBarItems from "./HeaderNameItem";
import UserMenuOpen from "./HeaderUserMenu";
import Logo from "./Logo";
import MobileLoginButton from "./MobileLoginButton";

const Appbar = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.isLogin);
  useAuth();

  const { isOpen } = useAppSelector((state) => state.userImage);

  return (
    <>
      <SignUpModal
        open={isOpen === "signup"}
        handleClose={() => {
          dispatch(setIsOpen(""));
        }}
      />
      <SignInModal
        open={isOpen === "login"}
        handleClick={() => {
          dispatch(
            setUserDetails({
              isLogin: true,
              id: null,
              email: null,
              key: null,
            }),
          );
        }}
        handleClose={() => {
          dispatch(setIsOpen(""));
        }}
      />
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          height: "5.313rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { lg: "0", xs: "1.69rem" },
        }}
      >
        <Link href="/">
          <Logo />
        </Link>

        <Stack
          direction={"row"}
          sx={{ gap: "6rem", display: { lg: "flex", xs: "none" } }}
        >
          <AppBarItems />
        </Stack>

        <Stack direction={"row"} sx={{ gap: "1.30rem" }}>
          <Stack
            direction={"row"}
            spacing={3}
            sx={{
              alignItems: "center",
              display: { lg: "none", xs: "flex" },
            }}
          >
            <Box
              onClick={() => setOpenDrawer(true)}
              sx={{ cursor: "pointer", display: { md: "none" } }}
            >
              <AppbarSvg />
            </Box>

            {!user && (
              <MobileLoginButton onClick={() => dispatch(setIsOpen("login"))} />
            )}
          </Stack>
          {!user && (
            <CustomButtons onClick={() => dispatch(setIsOpen("login"))} />
          )}
          {user && (
            <UserMenuOpen
              setOpenUserMenu={setOpenUserMenu}
              openUserMenu={openUserMenu}
            />
          )}
        </Stack>
      </Stack>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: Colors.BLACK,
            width: "18.75rem",
            borderRight: "1px solid var(--grey)",
          },
        }}
        sx={{ display: { lg: "none" } }}
      >
        <List sx={{ marginTop: "1rem" }}>
          <AppbarIcons setOpenDrawer={setOpenDrawer} />
        </List>
      </Drawer>
    </>
  );
};

export default Appbar;
