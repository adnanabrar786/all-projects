import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { Fragment } from "react";
import BodyParts from "../BodyParts";
import FeatureSection from "../FeatureSection";
import LogoSection from "../LogoSection";
import Signupbar from "../SignupBar";
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
          src={"/Rectangle_3.png"}
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
          <Typography
            sx={{
              color: "#000",
              textAlign: "center",
              fontSize: { md: "40px", xs: "16.364px" },
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              span: { color: "#155932", fontWeight: "800" },
            }}
          >
            Quality
            <span> Aftermarket </span>
            Parts For Trucks
          </Typography>

          <Typography
            sx={{
              color: "#000",
              textAlign: "center",
              fontSize: { md: "26px", xs: "10.636px" },
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              span: {
                color: "#155932",
                fontWeight: { md: "700", xs: "600" },
              },
              marginTop: { md: "0px", xs: "5.36px" },
            }}
          >
            Building Your Trust <span> Since 1990.</span>
          </Typography>

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
      <Signupbar />
      {/* // TODO */}
      {/* {loader && <Loader />} */}
    </Fragment>
  );
};

export default Home;
