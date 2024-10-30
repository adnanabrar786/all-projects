import { Box } from "@mui/material";
import { ColoredLogoIcon } from "constants/images.routes";
import { SEEKINVEST } from "constants/pages.routes";
import Image from "next/image";
import Link from "next/link";

const HomeLogo = () => {
  return (
    <Link href={SEEKINVEST} target="_blank">
      <Box
        sx={{
          alignSelf: "start",
          position: "absolute",
          top: "1.53rem",
          left: "2rem",
        }}
      >
        <Image
          priority
          src={ColoredLogoIcon}
          alt="Home Icon"
          width={122}
          height={24}
        />
      </Box>
    </Link>
  );
};

export default HomeLogo;
