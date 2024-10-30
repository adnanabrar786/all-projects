import { Box } from "@mui/system";
import Image from "next/image";

export default function LogoSection() {
  return (
    <>
      <Box
        flexDirection={"row"}
        sx={{
          display: "flex",
          maxWidth: "1440px",
          justifyContent: "center",
          alignItems: "center",
          gap: { md: "110px", sm: "50px", xs: "15px" },
          height: { xs: "190px", md: "300px" },
          padding: { sm: "0px 44px", xs: "0px 20px" },
          img: {
            objectFit: "contain",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "300px", sm: "90.323px", md: "140px" },
            height: { xs: "158.71px", md: "140px" },
          }}
        >
          <Image src={"/logo1.png"} alt={"logo image"} fill sizes="100%" />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "300px", sm: "90.323px", md: "140px" },
            height: { xs: "78.065px", md: "140px" },
          }}
        >
          <Image src={"/logo2.png"} alt={"logo image"} fill sizes="100%" />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "300px", sm: "90.323px", md: "140px" },
            height: { xs: "69.677px", md: "140px" },
          }}
        >
          <Image src={"/logo3.png"} alt={"logo image"} fill sizes="100%" />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: { xs: "300px", sm: "90.323px", md: "140px" },
            height: { xs: "120px", sm: "90.323px", md: "140px" },
          }}
        >
          <Image src={"/logo4.png"} alt={"logo image"} fill sizes="100%" />
        </Box>
      </Box>
    </>
  );
}
