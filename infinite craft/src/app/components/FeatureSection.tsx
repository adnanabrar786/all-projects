"use client";

import LinesPattern from "@/assets/icons/linespattern.svg";
import Logo from "@/assets/images/logo.png";
import BackgroundOverlay from "@/components/common/BackgroundOverlay";
import CustomContainedButton from "@/components/common/CustomContainedButton";
import Input from "@/components/common/Input";
import { Colors } from "@/utils/enums/colors";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import FeatureDesc from "./FeatureDesc";

const FeatureSection = () => {
  return (
    <>
      <Grid
        id="prompt"
        container
        columnSpacing={{ md: 5, xs: 0 }}
        sx={{
          marginTop: { md: "0", xs: "3.5rem" },
          justifyContent: "center",
          alignItems: "center",
          minHeight: { md: "100vh" },
          color: "white",
          position: "relative",
          // overflow: "hidden",
          width: "100%",
          padding: { lg: "0", xs: "2rem 1.69rem" },
        }}
      >
        <Grid item md={5} xs={12}>
          <Typography
            sx={{
              // width: { lg: '100%', sm: '20.6875rem', xs: '90%' },
              fontSize: { md: "4rem", sm: " 3rem", xs: "2.5rem" },
              fontWeight: "700",
              textTransform: "uppercase",
              span: { color: "#2D969B" },
              lineHeight: {
                lg: "4.34375rem",
                sm: "4.34375rem",
                xs: "3.125rem",
              },
            }}
          >
            HOW DOES IT <span>WORK?</span>
          </Typography>
          <FeatureDesc />
        </Grid>

        <Grid
          item
          md={7}
          xs={12}
          sx={{
            position: "relative",
            height: { lg: "25.125rem", sm: "20.0625rem", xs: "18.625rem" },
            justifyContent: { lg: "center" },
          }}
        >
          {/* ******************** PROMPT BOX ********************** */}
          <Stack
            sx={{
              width: { lg: "22rem", sm: "20.0625rem", xs: "12.4375rem" },
              backgroundColor: "var(--darkPrimary)",
              border: `0.06rem solid ${Colors.WHITE}`,
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "2rem", sm: "1.625rem", xs: "1.4375rem" },
                fontWeight: "600",
              }}
            >
              Your Prompt
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                backgroundColor: Colors.WHITE,
                borderRadius: "0.2rem",
                height: "2.313rem",
                marginTop: { sm: "0.66rem", xs: "1.3rem" },
                color: Colors.BLACK,
                fontSize: { lg: "0.75rem", xs: "0.4625rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <Input
                sx={{
                  ".MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                  ".MuiOutlinedInput-input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px white inset",
                    borderRadius: "0",
                    WebkitTextFillColor: "var(--lightwhite)",
                    caretColor: "var(--lightwhite)",
                  },
                }}
                placeholder="Craft case studies for AI chatbots."
              />
            </Box>

            <CustomContainedButton
              sx={{
                width: { lg: "15rem", sm: "7.4375rem", xs: "5.1875rem" },
                height: { md: "2.3rem", sm: "2.3125rem", xs: "1.8125rem" },
                fontSize: { lg: "1rem", xs: "0.75rem" },
                marginLeft: { lg: "2rem", xs: "0" },
                marginTop: { lg: "1.7rem", xs: "0.78rem" },
                boxShadow: "none",
                backgroundColor: "var(--primaryLight)",
              }}
              text="Generate"
            />
          </Stack>

          {/* ******************** INFINITE CRAFT RESULT ********************** */}
          <Stack
            sx={{
              width: { lg: "22rem", sm: "20.8125rem", xs: "14rem" },
              backgroundColor: "#2D969B",
              border: "1px solid #FFF",
              borderRadius: "1rem",
              padding: "1rem",

              position: "absolute",
              left: { lg: "21.5rem", sm: "9.5rem", xs: "4rem" },
              top: { lg: "10rem", sm: "7.5rem", xs: "9.5rem" },
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "2rem", sm: "1.375rem", xs: "1.2rem" },
                fontWeight: "600",
              }}
            >
              Infinite Craft Result
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: { lg: "1rem", sm: "0.75rem", xs: "0.60rem" },
              }}
            >
              You are a case study writer with expertise in AI and chatbots. I
              need you to craft three case studies highlighting the
              effectiveness of AI chatbots in various industries. Each case
              study should be around 800-1000 words and focus on the problems
              the business faced, the solutions the chatbots provided, and the
              results achieved. Include real or hypothetical data to back up the
              claims. Write in a persuasive tone to convince business
              decision-makers of the value of implementing AI chatbots.
            </Typography>
          </Stack>

          {/* ******************** LINES AND IMAGE ********************** */}
          <Box
            sx={{
              position: "absolute",
              left: { lg: "24.5rem", sm: "18rem", xs: "7rem" },
              top: { lg: "3rem", sm: "0", xs: "2rem" },
              zIndex: "-1",
            }}
          >
            <LinesPattern />
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: { lg: "31.5rem", sm: "25rem", xs: "13.8rem" },
              top: { lg: "2.8rem", sm: "-0.25rem", xs: "1.8rem" },
              zIndex: "-1",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "5rem", lg: "5rem" },
                height: "5rem",
                img: {
                  objectFit: "contain",
                  right: "0",
                },
              }}
            >
              <Image src={Logo} alt={"logo image"} fill />
            </Box>
          </Box>
        </Grid>

        {/* ******************** BACKGROUND OVERLAY ********************** */}
        <BackgroundOverlay left={0} />
      </Grid>
    </>
  );
};

export default FeatureSection;
