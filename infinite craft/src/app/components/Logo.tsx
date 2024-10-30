import { Box, Stack } from "@mui/material";
import Image from "next/image";
import _logo from "@/assets/images/logo.png";
import _logoText from "@/assets/images/logoText.png";

const Logo = () => {
  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: "0.63rem" }}>
      <Box
        sx={{
          position: "relative",
          width: { lg: "5.875rem", xs: "3.0625rem" },
          height: { lg: "5.3125rem", xs: "2.6875rem" },
          img: {
            objectFit: "contain",
          },
        }}
      >
        {_logo && <Image src={_logo} alt={"logo image"} fill />}
        {/* <img src={logo} alt="logo-image" style={{}} /> */}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { lg: "7.5rem", xs: "3.875rem" },
          height: { lg: "3.125rem", xs: "1.625rem" },
          img: {
            objectFit: "contain",
          },
        }}
      >
        {_logoText && <Image src={_logoText} alt={"logo image"} fill />}
      </Box>
    </Stack>
  );
};

export default Logo;
