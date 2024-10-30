"use client";

import { poppins } from "@/components/ThemeRegistry/theme";

import { Grid, Stack, Typography } from "@mui/material";
import FooterIcons from "./FooterIcons";
import ItemList from "./FooterNameItem";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        height: { lg: "22.25rem" },
        color: "white",
        backgroundColor: "#0B1C20",
        width: "100%",
        padding: { lg: "3.8rem 6.4rem", xs: "1rem" },
        justifyContent: "space-between",
      }}
    >
      <Grid rowSpacing={2} container sx={{ alignItems: "center" }}>
        <Grid item lg={6} xs={12}>
          <Logo />
        </Grid>
        <Grid
          item
          lg={6}
          // xs={12}
          sx={{
            display: "flex",
            justifyContent: { lg: "end", xs: "start" },
            gap: { lg: "5rem", xs: "1rem" },
          }}
        >
          <ItemList />
        </Grid>
      </Grid>

      <Grid rowSpacing={2} container>
        <Grid item sm={6} xs={12}>
          <FooterIcons />
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          sx={{ display: "flex", justifyContent: { lg: "end", xs: "start" } }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontFamily: poppins.style.fontFamily,
              opacity: "0.5",
            }}
          >
            © 2023 Infinite Craft. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Footer;
