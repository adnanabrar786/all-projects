import { useAppDispatch } from "@/hooks/reduxHooks";
import { LIBRARY_PAGE_URL } from "@/routes";
import { RootState } from "@/store";
import { setAppbarId } from "@/store/slices/imageSlice";
import { infoMessage } from "@/utils/enums";
import { Colors } from "@/utils/enums/colors";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

const appbarItems = [
  { item: "Pricing", icon: MonetizationOnOutlinedIcon, id: "pricing" },
  { item: "Prompts Library", icon: LibraryAddCheckOutlinedIcon, id: "prompt" },
  { item: "FAQ", icon: LiveHelpOutlinedIcon, id: "faqs" },
];
type prop = {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};
export default function AppbarIcons({ setOpenDrawer }: prop) {
  const router = useRouter();
  const pathname = usePathname();
  const _user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const premium: string = _user?.subscription;

  return (
    <>
      {appbarItems.map(({ item, icon: Icon, id }) => (
        <ListItem key={item}>
          <ListItemButton
            sx={{ color: Colors.WHITE }}
            onClick={() => {
              const container = document.getElementById(id);
              if (id === "prompt") {
                if (_user.id && premium === "PREMIUM") {
                  dispatch(setAppbarId(""));
                  router.push(LIBRARY_PAGE_URL);
                } else if (_user.id && premium === "FREEMIUM") {
                  dispatch(setAppbarId(""));
                  infoMessage("Please Buy Premium");
                } else {
                  infoMessage("Please Login");
                }
              } else if (pathname !== "/") {
                dispatch(setAppbarId(id));
                router.push("/");
              } else {
                container?.scrollIntoView({ behavior: "smooth" });
              }
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <Icon sx={{ color: Colors.WHITE }} />
            </ListItemIcon>
            {item}
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
