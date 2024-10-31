import { useAppContext } from "@/context/appContext";
import { generateSlug } from "@/utils/string";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
interface Props {
  item: any;
}

const NavbarMenuList = ({ item }: Props) => {
  const pathname = usePathname();
  const [isHover, setIsHover] = useState(false);
  const { setLoader } = useAppContext();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  return (
    <Stack
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        href={`/products/category_id/${item.id}/category/${generateSlug(
          item.name.replaceAll("/", "-")
        )}`}
      >
        <Typography
          sx={{
            fontSize: { lg: "16px", md: "14px" },
            fontWeight: "bold",
            textTransform: "capitalize",
            color:
              pathname === item.link ||
              (category &&
                decodeURIComponent(category.toLowerCase()) ===
                  item.name.toLowerCase())
                ? "var(--dark-blue)"
                : "var(--text-grey)",
            lineHeight: "normal",
            fontStyle: "normal",
          }}
        >
          {item.name}
        </Typography>
      </Link>
      {item.name !== "HOME" && (
        <Stack
          sx={{
            opacity: isHover ? "1" : "0",
            position: "absolute",
            zIndex: isHover ? "10000" : "-100",
            backgroundColor: "var(--dark-blue)",
            borderRadius: "10px",
            padding: "15px",
            alignItems: "center",
            top: "20px",
            transform: `translateY(${isHover ? "0px" : "-10px"})`,
            height: "auto",
            transition: "all 0.5s",
            cursor: "pointer",
            width: "15rem",
          }}
        >
          <Stack>
            <Image
              src={item.picture}
              priority
              width={80}
              height={60}
              alt="pic"
            />
          </Stack>
          <Stack>
            {item.sub_categories.map((subitem, index) => (
              <Link
                // TODO
                // onClick={() => {
                //   setLoader(true);
                //   document.body.style.overflow = "hidden";
                // }}
                key={index}
                href={`/products/category_id/${item.id}/category/${generateSlug(
                  item.name.replaceAll("/", "-")
                )}/subcategory_id/${subitem.id}/subcategory/${generateSlug(
                  subitem.name.replaceAll("/", "-")
                )}`}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "var(--white)",
                    marginTop: "10px",
                    textAlign: "left",
                    "&:hover": {
                      WebkitTextStrokeWidth: "0.7px",
                      WebkitTextStrokeColor: "var(--black)",
                    },
                    WebkitTextStrokeWidth:
                      subcategory === subitem.name ? "0.7px" : "0px",
                    WebkitTextStrokeColor:
                      subcategory === subitem.name ? "var(--black)" : "",
                  }}
                >
                  {subitem.name}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default NavbarMenuList;
