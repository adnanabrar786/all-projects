import NavButton from "@/components/Styles/NavButton";
import { CONTACT } from "@/components/config/route/pages.routes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CustomAccordion from "./CustomAccordion";

interface Props {
  data: any;
}

export default function Navbarsmall({ data }: Props) {
  const [showMenuBar, setShowMenuBar] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string>("");

  return (
    <Box
      sx={{
        display: { md: "none", xs: "flex" },
        alignItems: "center",
        height: { xs: "100px" },
        background: "var(--white)",
        position: "relative",
        boxShadow: "0px 10px 60px 0px rgba(226, 236, 249, 0.50)",
        zIndex: "100",
      }}
    >
      <Stack
        direction={{ xs: "row" }}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "space-between", xs: "space-between" },
          margin: " 0px 20px  0 20px",
        }}
      >
        <Stack
          sx={{
            display: { md: "none", xs: "block" },
            img: {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            setShowMenuBar(!showMenuBar);
          }}
        >
          <Image
            src={"/hamburger.png"}
            priority
            quality={100}
            width={30}
            height={30}
            alt="arrow"
          />
        </Stack>
        <Stack>
          <Link href="/">
            <Image
              src={"/logo.png"}
              priority
              quality={100}
              width={123}
              height={40}
              alt="arrow"
            />
          </Link>
        </Stack>
        <Box />
      </Stack>

      <Stack
        direction={"column"}
        sx={{
          position: "fixed",
          top: "0px",
          bottom: "0",
          minHeight: "100vh",
          maxHeight: "120vh",
          transform: showMenuBar ? "translateX(0px)" : "translateX(-100%)",
          width: "100%",
          transition: "all 1s",
          zIndex: "100",
          backgroundColor: "var(--white)",
          boxSizing: "border-box",
          paddingBottom: "20px",
          overflow: "scroll",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--text-grey)",
            padding: "26px 20px  15px 38px",
          }}
        >
          <Stack
            sx={{
              height: "100%",
            }}
          >
            <Image
              src={"/logo.png"}
              priority
              quality={100}
              width={123}
              height={40}
              alt="arrow"
            />
          </Stack>
          <Stack
            sx={{
              height: "100%",
              img: {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              setShowMenuBar(!showMenuBar);
            }}
          >
            <Image
              src={"/corssIcon.svg"}
              priority
              quality={100}
              width={24}
              height={24}
              alt="arrow"
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            padding: "0px 15px 0  22px ",
            gap: "41px",
          }}
        >
          <Stack
            sx={{
              margin: "40px 0 40px 0px",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <Link href={"/"}>
              <Stack
                direction={"row"}
                sx={{
                  margin: "0px 10px 20px 10px",
                  gap: "12px",
                  alignItems: "center",
                  width: "fit-content",
                }}
                onClick={() => {
                  setShowMenuBar(!showMenuBar);
                }}
              >
                <Image
                  src={"/home.svg"}
                  width={24}
                  height={24}
                  quality={100}
                  alt={"alt"}
                  priority
                />
                <Typography
                  sx={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: "var(--text-grey)",
                  }}
                >
                  Home
                </Typography>
              </Stack>
            </Link>

            {data &&
              data?.menu?.length &&
              data?.menu?.map((items, index) => (
                <CustomAccordion
                  key={`${index}`}
                  index={`${index}`}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  items={items}
                  setShowMenuBar={setShowMenuBar}
                  showMenuBar={showMenuBar}
                />
              ))}
          </Stack>
          <Stack
            sx={{
              width: "fit-content",
              paddingLeft: "15px",
            }}
          >
            <Link href={CONTACT}>
              <NavButton
                onClick={() => {
                  setShowMenuBar(!showMenuBar);
                }}
                text="Contact Us"
              />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
