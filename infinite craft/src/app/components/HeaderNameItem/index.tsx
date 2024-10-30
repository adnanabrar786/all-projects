import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AppBarItem from "./AppBarItem";

const appbarItems = [
  { item: "Pricing", icon: MonetizationOnOutlinedIcon, id: "pricing" },
  { item: "Prompts Library", icon: LibraryAddCheckOutlinedIcon, id: "prompt" },
  { item: "FAQ", icon: LiveHelpOutlinedIcon, id: "faqs" },
];

export default function AppBarItems() {
  return (
    <>
      {appbarItems.map((appbarItem, index) => (
        <AppBarItem key={index} appbarItem={appbarItem} />
      ))}
    </>
  );
}
