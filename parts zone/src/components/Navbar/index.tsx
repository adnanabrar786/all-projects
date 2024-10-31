import { useAppContext } from "@/context/appContext";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Image from "next/image.js";
import Link from "next/link.js";
import { useParams, usePathname, useSearchParams } from "next/navigation.js";
import NavButton from "../Styles/NavButton";
import { CONTACT, ROOT } from "../config/route/pages.routes";
import NavbarMenuList from "./NavbarMenuList";
import Navbarsmall from "./Navnbarsmall.tsx";

interface Props {
  data: any;
}

const index = ({ data }: Props) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { setLoader } = useAppContext();

  return (
    <Box>
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          padding: { lg: "0px 80px", xs: " 0px 20px" },
          alignItems: "center",
          height: "124px",
          background: "var(--white)",
          boxShadow: "0px 10px 60px 0px rgba(226, 236, 249, 0.50)",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Link href="/">
            <Image
              src={"/logo.png"}
              priority
              quality={100}
              width={123}
              height={70}
              alt="arrow"
            />
          </Link>
        </Stack>

        <Stack
          direction={"row"}
          sx={{
            gap: "20px",
            position: "relative",
          }}
        >
          <Stack
            sx={{
              cursor: "pointer",
              fontSize: { lg: "16px", md: "14px" },
              fontWeight: "bold",
              color:
                pathname === ROOT ? "var(--dark-blue)" : "var(--text-grey)",
              lineHeight: "normal",
              fontStyle: "normal",
            }}
          >
            <Link href="/">
              <Typography
                sx={{
                  color:
                    pathname === "/" ? "var(--dark-blue)" : "var(--text-grey)",
                  lineHeight: "normal",
                  fontWeight: "bold",
                  fontStyle: "normal",
                  fontSize: { lg: "16px", md: "14px" },
                }}
              >
                Home
              </Typography>
            </Link>
          </Stack>
          {data &&
            data?.menu?.length &&
            data?.menu?.map((item, index) => (
              <Stack
                // TODO
                // onClick={() => {
                //   setLoader(true);
                //   document.body.style.overflow = "hidden";
                // }}
                key={index}
              >
                <NavbarMenuList item={item} />
              </Stack>
            ))}
        </Stack>

        <Stack>
          <Link href={CONTACT}>
            <NavButton text="Contact US" />
          </Link>
        </Stack>
      </Box>

      <Navbarsmall data={data} />
    </Box>
  );
};

export default index;
