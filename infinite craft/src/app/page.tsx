// import { getImages } from "@/services/storage.service";
import _bg from "@/assets/images/bgImg.png";
import _logoLight from "@/assets/images/logoLight.png";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import FAQ from "./components/FAQ";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import PricingSection from "./components/PricingSection";
import UserStories from "./components/UserStories";
import BackToTop from "./components/scroller";
export const metadata = {
  title: "Home | Infinite Craft",
  description: "Home",
};

export default async function HomePage() {
  return (
    <Stack
      sx={{ width: "100%", backgroundColor: "black", alignItems: "center" }}
    >
      <Stack
        sx={{
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "black",
          position: "relative",
          maxWidth: "1440px",

          // overflow: 'hidden',
        }}
      >
        {/* <Toolbar id="back-to-top-anchor" /> */}
        <Stack
          sx={{
            // backgroundImage: `url(${_logoLight})`,
            // backgroundSize:'100%',
            zIndex: "1",
            width: "100%",
            padding: { lg: "2.8rem", xs: "0" },
            maxWidth: "90rem",
          }}
        >
          <HeroSection />
          <FeatureSection />
          <UserStories />
          <PricingSection />
          <FAQ />
        </Stack>

        <BackToTop></BackToTop>

        {/* ******************** BACKGROUND IMAGES ********************** */}

        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            position: "absolute",
            top: "0",
          }}
        >
          {_bg && (
            <Image
              priority
              quality={100}
              src={_bg}
              alt="backgroundImage"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>

        <Box
          sx={{
            width: { lg: "75vh", md: "70vh", xs: "60vh" },
            height: { lg: "75vh", md: "75vh", xs: "55vh" },
            position: "absolute",
            top: { lg: "10vh", md: "10vh", xs: "15vh" },
            right: { lg: "0rem", md: "0rem", xs: "0rem" },
            overflow: "hidden",
            // left: { md: 'auto', xs: '0' },
          }}
        >
          {_logoLight && (
            <Image
              priority
              quality={100}
              src={_logoLight}
              alt="backgroundImage"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        <Footer />
      </Stack>
    </Stack>
  );
}
