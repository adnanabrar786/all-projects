import { useAppContext } from "@/context/appContext";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PartsHeading from "../PartsHeading";
import { PartsData } from "../config/interface";
import BodyPartsSlider from "./Template/BodyPartsSlider";

interface Props {
  cabinAndBodyParts: any;
  engineAndSuspensionParts: any;
  trailerAndUniversalParts: any;
}

export default function BodyParts({
  cabinAndBodyParts,
  engineAndSuspensionParts,
  trailerAndUniversalParts,
}: Props) {
  const { setLoader } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setLoader(false);
    document.body.style.overflow = "initial";
  }, []);

  const parts: PartsData[] = [
    {
      title: "Cabin & Body Parts",
      data: cabinAndBodyParts,
    },
    {
      title: "Engine & Suspension Parts",
      data: engineAndSuspensionParts,
    },

    {
      title: "Trailer & Universal Parts",
      data: trailerAndUniversalParts,
    },
  ];

  return (
    <Box
      sx={{
        padding: { md: "0px 100px", xs: "0px 20px" },
      }}
    >
      {parts.map((part, index) => (
        <Stack key={index}>
          <PartsHeading heading={part.title} />
          <Stack
            sx={{
              marginTop: "17px",
            }}
          >
            <BodyPartsSlider data={part.data} />
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
