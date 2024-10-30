import { useAppSelector } from "@/hooks/reduxHooks";
import { DASHBOARD_URL, PROFILE_URL, ROOT_URL } from "@/routes";
import { setUserDetails } from "@/store/slices/authSlice";
import { Colors } from "@/utils/enums/colors";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Avatar, ClickAwayListener, Stack, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type Prop = {
  setOpenUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openUserMenu: boolean;
};

export default function UserMenuOpen({ setOpenUserMenu, openUserMenu }: Prop) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const logout = async () => {
    await Auth.signOut();
    dispatch(
      setUserDetails({
        isLogin: false,
        id: null,
        email: null,
        key: null,
      }),
    );
    setOpenUserMenu(false);
    router.push(ROOT_URL);
  };

  const userOptions = [
    { item: "Dashboard" },
    { item: user?.given_name + " " + user?.family_name },
    { item: user.email },
    { item: "Settings" },
    { item: "Logout" },
  ];

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpenUserMenu(false)}>
        <Stack
          direction={"row"}
          sx={{
            // display: { sm: 'flex', xs: 'none' },
            position: "relative",
          }}
        >
          <Stack
            direction={"row"}
            onClick={() => setOpenUserMenu(!openUserMenu)}
            sx={{
              alignItems: "center",
              gap: "0.7rem",
              cursor: "pointer",
            }}
          >
            <Avatar src={user?.image} />
            <ArrowBackIosRoundedIcon
              sx={{
                color: "var(--white)",
                transition: "all 0.3s ease",
                transform: openUserMenu ? "rotate(90deg)" : "rotate(-90deg)",
              }}
            />
          </Stack>

          {openUserMenu && (
            <Stack
              sx={{
                zIndex: "1",
                minWidth: "10rem",
                backgroundColor: Colors.WHITE,
                borderRadius: "0.3rem",
                position: "absolute",
                padding: "1rem",
                right: "-0.3rem",
                top: "3rem",
                // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                // boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before":
                  // !event ?
                  {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    // left: "auto",
                    // right: 14,
                    // left,
                    right: 10,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 5,
                  },
              }}
            >
              {userOptions.map((userOption) => (
                <Typography
                  key={userOption.item}
                  onClick={() => {
                    if (userOption.item === "Logout") {
                      router.refresh();
                      logout();
                    }
                    if (userOption.item === "Settings") {
                      router.push(PROFILE_URL);
                    }
                    if (userOption.item === "Dashboard") {
                      router.refresh();
                      router.push(DASHBOARD_URL);
                    }
                  }}
                  sx={{
                    paddingY: "0.5rem",
                    ":hover": {
                      textDecoration: "underLine",
                      cursor: "pointer",
                    },
                  }}
                >
                  {userOption.item}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
      </ClickAwayListener>
    </>
  );
}
