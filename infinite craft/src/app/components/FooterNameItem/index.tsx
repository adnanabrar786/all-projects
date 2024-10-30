import { poppins } from "@/components/ThemeRegistry/theme";
import { setAppbarId } from "@/store/slices/imageSlice";
import { Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// const itemsList = ["Pricing", "Showcase", "Contact Us"];
const itemsList = [
  { item: "Pricing", id: "pricing" },
  { item: "Showcase", id: "prompt" },
  { item: "Contact Us", id: "contactUS" },
];

export default function ItemList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {itemsList.map((list) => (
        <Typography
          onClick={() => {
            if (pathname !== "/") {
              dispatch(setAppbarId(list.id));
              router.push("/");
            }
            if (list.id === "contactUS") {
              router.push("https://x.com/InfiniteCraftai");
            }
            const container = document.getElementById(list.id);
            container?.scrollIntoView({ behavior: "smooth" });
          }}
          key={list.item}
          sx={{
            fontSize: { lg: "1.375rem", xs: "1rem" },
            cursor: "pointer",

            fontFamily: poppins.style.fontFamily,
          }}
        >
          {list.item}
        </Typography>
      ))}
    </>
  );
}
