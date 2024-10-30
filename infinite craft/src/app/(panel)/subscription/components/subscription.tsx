"use client";

import CrossIconSmall from "@mui/icons-material/Clear";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, Grid } from "@mui/material";
import FreeBanner from "./freeBanner";
const Subscriptions = [
  {
    title: "Free",
    key: "first",
    price: "$0/ Month",
    Icon: (
      <CrossIconSmall
        sx={{
          color: "#FF2323",
          width: { md: "1.5rem", sm: "1.40788rem", xs: "0.83194rem" },
          height: {
            md: "1.5rem",
            sm: "1.40788rem",
            xs: "0.83194rem",
          },
        }}
      />
    ),
    // bgColor: "#dfeff0",
    bgColor: "var(--freebannerbg)",
    color: "var(--textWhite)",
    description: "Only 10 Prompts a Month",

    //   buttonBg: "var(--primary)",
    //   buttonColor: "#ffffff",
  },
  {
    title: "Premium",
    key: "second",
    price: "$4.99/ Month",
    Icon: (
      <DoneOutlinedIcon
        sx={{
          color: "white",
          width: { md: "1.5rem", sm: "1.40788rem", xs: "0.83194rem" },
          height: { md: "1.5rem", sm: "1.40788rem", xs: "0.83194rem" },
        }}
      />
    ),
    description: "Unlimited Prompts",
    bgColor: "#2D969B",
    color: "#FFFFFF",
    //   buttonBg: "white",
    //   buttonColor: "#000000",
  },
];

export default function subscription() {
  return (
    <>
      <Box sx={{ position: "relative", paddingTop: "1.56rem" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "1.94rem",
          }}
        >
          {/* <Box
            sx={{
              display: { lg: "flex", xs: "none" },
              height: "90px",
              paddingLeft: "25px",
              boxShadow: "var(--boxshadowcolor)",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-9px",
              backgroundColor: "var(--backgroundsidebar)",
            }}
          >
            <Typography sx={{ color: "var(--textWhite)", fontWeight: 600 }}>
              My Profile
            </Typography>
            <ToggleDarkMode bgcolor="var(--backgroundwhite)" />
          </Box> */}
          <Grid
            direction={"row"}
            spacing={3}
            container
            sx={{
              width: "100%",
              //   gap: '30px',
              height: "65px",
              paddingLeft: "20px",
            }}
          >
            {Subscriptions.map((subscription) => (
              <FreeBanner
                title={subscription.title}
                key={subscription.key}
                Icon={subscription.Icon}
                description={subscription.description}
                bgColor={subscription.bgColor}
                price={subscription.price}
                color={subscription.color}
                // buttonColor={subscription.buttonColor}
                // buttonBg={subscription.buttonBg}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
