import { ROOT_URL } from "@/routes";
import { setUserDetails } from "@/store/slices/authSlice";
import { default as LogoutIcon } from "@mui/icons-material/Logout";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const PLACEHOLDER_LINKS = [{ text: "Logout", icon: LogoutIcon }];

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
    router.push(ROOT_URL);
  };

  return (
    <List sx={{ width: "100%" }}>
      {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
        <ListItem
          sx={{
            color: "var(--textWhite)",
          }}
          key={text}
          disablePadding
          onClick={logout}
        >
          <ListItemButton>
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
    </List>
  );
}
