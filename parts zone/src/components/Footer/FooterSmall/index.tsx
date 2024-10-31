import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Collapse, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import CommonFooter from "../CommonFooter";
import ShowAnswer from "./ShowAnswer";

export default function FooterSmall() {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          backgroundColor: "#292929",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Stack spacing={3} sx={{ padding: "44px 0 45.4px 0" }}>
          <ShowAnswer
            title="Our Company"
            description="Grand Auto Parts, a renowned aftermarket truck parts supplier
                  of Hino, Nissan, Mitsubishi, and ISUZU since 1990. We have
                  established and specialized in Hino, ISUZU, Nissan, MITSUBISHI
                  Trucks, Trailers & Universal parts. We are the LARGEST
                  INDEPENDENT STOCKIST of the aftermarket truck parts. <br></br>
                
                  We have logistics in place to deliver your required orders in
                  a fast and efficient way. We provide parts worldwide,
                  including countries like Thailand, Indonesia, Malaysia,
                  Vietnam, Australia, Philippines, Laos, Bangladesh, Taiwan,
                  Cambodia, Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, UAE and
                  more. We value our reputation for accuracy, integrity, quality
                  and personalized service that we provide to clientele. We have
                  the ability to adapt to market trends and new products that
                  have maintained our brand image at the top of the market."
          />
          <ShowAnswer
            title="Fast Delivery"
            description="Whether it is an OEM (Original Equipment Manufacturer) truck
            part or an aftermarket truck parts, our systems both on-line and
            in-house are the link via a high-speed communications line which
            provides the clients with the latest pricing and stock
            availability.
            <br></br>
         We have thousands of original and replacement truck
            parts ready for immediate delivery. Contact our sales, whether
            you need a maintenance part, or a major aftermarket truck part
            to get your truck back on the road."
          />

          <Stack
            onClick={() => setShowAnswer(!showAnswer)}
            direction={"row"}
            spacing={4}
            sx={{
              padding: { lg: "2rem", xs: "1rem 1.5rem" },
              ".largeSvg": {
                display: { lg: "initial", xs: "none" },
                transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
                transition: "all 0.3s ease",
              },
              ".smallSvg": {
                display: { lg: "none", xs: "initial" },
                transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Stack
              sx={{
                flex: "1",
                transition: "all 0.3s ease",
                gap: showAnswer ? 4 : 0,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: { lg: "1.75rem", xs: "1.25rem" },
                  fontWeight: "600",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
              >
                Contact Details
              </Typography>
              <Collapse in={showAnswer}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    mb: "1.9rem",
                  }}
                >
                  <Image
                    priority
                    width={16.714}
                    height={20.306}
                    src="/location.svg"
                    alt="backgroundimage"
                  />
                  <Typography
                    sx={{
                      color: "#c4c2c2",
                      marginTop: "0.5rem",
                      textAlign: "left",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "132%",
                    }}
                  >
                    Royal Palace No. 777 Canghai Road, Yinzhou District,
                    <br />
                    Ningbo 315000 China.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    mb: "1.9rem",
                  }}
                >
                  <Image
                    priority
                    width={17.964}
                    height={17.964}
                    src="/phone.svg"
                    alt="backgroundimage"
                  />
                  <Typography
                    sx={{
                      color: "#c4c2c2",
                      textAlign: "left",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "132%",
                    }}
                  >
                    +1 (916) 664-8253
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                  }}
                >
                  <Image
                    priority
                    width={20.412}
                    height={14.4}
                    src="/message.svg"
                    alt="backgroundimage"
                  />
                  <Typography
                    sx={{
                      color: "#c4c2c2",
                      textAlign: "left",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "132%",
                    }}
                  >
                    info@grandautoparts.net
                  </Typography>
                </Box>
              </Collapse>
            </Stack>

            <ExpandMoreOutlinedIcon
              sx={{
                width: "1.7rem",
                height: "1.7rem",

                transform: showAnswer ? "rotate(180deg)" : "rotate(0deg)",
                transition: "all 0.3s",
                cursor: "pointer",
                color: "#fff",
              }}
            />
          </Stack>
        </Stack>
        <CommonFooter />
      </Box>
    </>
  );
}
