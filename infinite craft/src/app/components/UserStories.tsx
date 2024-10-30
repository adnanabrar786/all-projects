import _userStories from "@/assets/images/userStories.png";
import BackgroundOverlay from "@/components/common/BackgroundOverlay";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import UserStoriesDesc from "./UserStoriesDesc";

interface Props {
  backgroundColor?: string;
  userStories?: string;
}
const RectangularBox = ({ backgroundColor = "var(--white)" }: Props) => {
  return (
    <Box
      sx={{
        width: "2.25rem",
        height: "0.25rem",
        backgroundColor: backgroundColor,
      }}
    />
  );
};

const UserStories = () => {
  return (
    <Stack
      sx={{
        marginTop: { lg: "0rem", xs: "10rem" },

        justifyContent: "center",
        alignItems: "center",
        minHeight: { lg: "100vh" },
        color: "white",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "4rem", md: "3rem", sm: "2rem" },
          fontWeight: "700",
          marginBottom: "2rem",
          span: { color: "#2D969B" },
        }}
      >
        WHAT OUR <span>USERS</span> ARE SAYING
      </Typography>

      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={8}
        sx={{ alignItems: "center", marginTop: { lg: "8rem", md: "3.69rem" } }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "50%", md: "90%", lg: "31.5625rem" },
            height: { md: "26.625rem", xs: "21.1875rem" },
            img: {
              borderRadius: "2.625rem",
              objectFit: "cover",
            },
          }}
        >
          {_userStories && <Image src={_userStories} alt={"logo image"} fill />}
        </Box>

        <Stack sx={{ width: { lg: "39.125rem", md: "39.25rem", xs: "90%" } }}>
          <UserStoriesDesc />
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                lg: "flex-start",
                md: "flex-start",
                xs: "center",
              },
            }}
          >
            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{ marginTop: "1.56rem" }}
            >
              <RectangularBox backgroundColor="#2D969B" />
              <RectangularBox />
              <RectangularBox />
            </Stack>
          </Box>
        </Stack>
      </Stack>

      {/* ******************** BACKGROUND OVERLAY ********************** */}
      <BackgroundOverlay right={0} />
    </Stack>
  );
};

export default UserStories;
