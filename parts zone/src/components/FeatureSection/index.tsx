import { homefeatures } from "@/constant/data";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import StoriesDesc from "./Stories/StoriesDescription";

export default function FeatureSection() {
  return (
    <>
      <Box
        sx={{
          marginTop: "3rem",
          paddingBottom: { md: "65px", xs: "55px" },
          backgroundColor: "rgba(21, 89, 50, 0.10)",
        }}
      >
        {homefeatures.map((feature, index) => (
          <Stack
            key={index}
            sx={{
              paddingTop: "65px",
              display: "flex",
              flexDirection:
                feature.isReverse === true
                  ? { md: "row-reverse", xs: "column-reverse" }
                  : { md: "row", xs: "column-reverse" },
              alignItems: { xs: "center" },
              justifyContent: "space-evenly",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <StoriesDesc
                title={feature.subHeading}
                name={feature.heading}
                desc={feature.desc}
              />
            </Stack>

            <Box
              sx={{
                width: "350px",
                height: "350px",
              }}
            >
              <Image
                src={feature.img}
                alt={"logo image"}
                height={350}
                width={355}
              />
            </Box>
          </Stack>
        ))}
      </Box>
    </>
  );
}
