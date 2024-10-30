import { Stack } from "@mui/material";
import TextXl from "components/common/Text/TextXl";
import { BlueRocket, YellowStar } from "constants/images.routes";
import Image from "next/image";

const CompleteAssessmentImage = () => {
  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
          gap: "0.94rem",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            display: "flex",

            ".yellowStar": {
              display: "flex",
              justifyContent: "center",
              height: "10rem",
            },
          }}
        >
          <Image
            priority
            src={YellowStar}
            alt={"icon"}
            width={479}
            height={200}
            className="yellowStar"
          />

          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              ".blueRocket": {
                position: "absolute",
                justifyContent: "center",
                bottom: "0rem",
              },
            }}
          >
            <Image
              priority
              src={BlueRocket}
              alt={"icon"}
              width={98}
              height={99}
              className="blueRocket"
            />
          </Stack>
        </Stack>

        <TextXl
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "1.5rem",
          }}
          text="You’ve completed your assessment"
        />
      </Stack>
    </>
  );
};

export default CompleteAssessmentImage;
