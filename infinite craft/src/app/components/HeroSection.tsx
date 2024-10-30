"use client";

import _logoLight from "@/assets/images/logoLight.png";
import CustomContainedButton from "@/components/common/CustomContainedButton";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsOpen } from "@/store/slices/imageSlice";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Appbar from "./Appbar";
const HeroSection = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const dispatch = useAppDispatch();

  return (
    <>
      <Appbar />

      <Stack
        sx={{
          backgroundImage: `url(${_logoLight})`,
          marginTop: { lg: "5rem", xs: "0" },
          width: { lg: "47.875rem", sm: "31.125rem", xs: "auto" },
          gap: "1.94rem",
          padding: { lg: "0", xs: "1.69rem" },
        }}
      >
        <Box
          sx={{
            color: "var(--greyWhite)",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                lg: "4.5625rem",
                sm: "2.75rem",
                xs: "1.7rem",
                fontWeight: "300",
              },
            }}
          >
            You don't have to be a{" "}
            <span style={{ fontWeight: "800" }}> Prompt Guru </span>to craft
            top-tier{" "}
            <span
              style={{
                backgroundColor: "#2D969B",
                borderRadius: "3rem",
                fontWeight: "600",
                padding: "0.3rem",
              }}
            >
              {" "}
              PROMPTS
            </span>
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: { lg: "1.125rem", md: "1.125rem", sm: "0.75rem" },
            lineHeight: "1.34375rem",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          The power of ChatGPT lies not just in the AI but in your questions.
          Infinite Craft refines your standard prompts to MASTER prompts for
          superior ChatGPT outputs.
        </Typography>

        <Link
          href={isLogin ? "/dashboard" : "/"}
          onClick={(e) => {
            if (!isLogin) {
              e.preventDefault();
              dispatch(setIsOpen("signup"));
            }
          }}
        >
          <CustomContainedButton
            sx={{
              width: { lg: "17rem", xs: " 8.5rem" },
              height: { lg: "4.75rem", xs: "2.6875rem" },
              fontSize: { lg: "1.125rem", xs: "0.875rem" },
            }}
            text="Start now"
          />
        </Link>
      </Stack>
    </>
  );
};

export default HeroSection;
