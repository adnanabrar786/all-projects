import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { Fragment } from "react";
import BodyParts from "../BodyParts";
import FeatureSection from "../FeatureSection";
import LogoSection from "../LogoSection";
import GradientText from "../custom/GradientText";
// import Signupbar from "../SignupBar";
interface Props {
  cabinAndBodyParts: any;
  engineAndSuspensionParts: any;
  trailerAndUniversalParts: any;
}

const Home = ({
  cabinAndBodyParts,
  engineAndSuspensionParts,
  trailerAndUniversalParts,
}: Props) => {
  return (
    <Fragment>
      <Stack
        sx={{
          width: "100%",
          position: "relative",
          top: "-5px",
          img: {
            height: "100%",
            width: "100%",
          },
        }}
      >
        <Image
          src={"/Rectangle_3.svg"}
          width={1440}
          height={500}
          quality={100}
          alt={"alt"}
          priority
        />

        <Stack
          sx={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            top: "35%",
            gap: { md: "1rem", xs: "0rem" },
          }}
        >
          <Stack
            sx={{
              color: "#000",
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              textAlign: "center",
              fontSize: { md: "40px", sm: "17px", xs: "12px" },
              fontStyle: "normal",
              fontWeight: "900",
              lineHeight: "normal",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              fontFamily:
                "Roboto,Krona One,Inter,Lato,Open Sans,Poppins,Exo,Arial,sans-serif",
            }}
          >
            Quality
            <GradientText
              sx={{ fontSize: { md: "40px", sm: "17px", xs: "12px" } }}
              text={"Aftermarket"}
            />
            &nbsp;Parts For Trucks
          </Stack>

          <Stack
            sx={{
              color: "#000",
              textAlign: "center",
              fontSize: { md: "26px", xs: "10.636px" },
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              display: "block",
              gap: "13px",
              fontFamily:
                "Roboto,Krona One,Inter,Lato,Open Sans,Poppins,Exo,Arial,sans-serif",

              marginTop: { md: "0px", xs: "5.36px" },
            }}
          >
            <span>Building Your Trust</span>
            <span
              style={{
                marginLeft: "10px",
                background:
                  "linear-gradient(-180deg, rgba(21,89,50,1) 0%, rgba(0,166,204,1) 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Since 1990.
            </span>
          </Stack>

          <Typography
            sx={{
              color: "#000",
              textAlign: "center",
              fontSize: { md: "16px", xs: "7px" },
              fontStyle: "normal",
              fontWeight: { md: "400" },
              lineHeight: "normal",
              mt: { md: "1rem", xs: "14.2px" },
            }}
          >
            Maintaining an Upright Position as one of the Most Trusted Company
          </Typography>
        </Stack>
      </Stack>
      <BodyParts
        // TODO
        // setLoader={setLoader}
        cabinAndBodyParts={cabinAndBodyParts}
        engineAndSuspensionParts={engineAndSuspensionParts}
        trailerAndUniversalParts={trailerAndUniversalParts}
      />
      <FeatureSection />
      <LogoSection />
      {/* <Signupbar /> */}
      {/* // TODO */}
      {/* {loader && <Loader />} */}
    </Fragment>
  );
};

export default Home;
