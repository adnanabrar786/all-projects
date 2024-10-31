import { footerList } from "@/constant/data";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Link from "next/link";
import CopyRights from "./CopyRights";

export default function Footer() {
  return (
    <>
      <footer>
        <Box
          sx={{
            backgroundColor: "var(--black-footer)",
            color: "var(--white)",
            padding: { lg: "40px 100px 0px 100px", md: "40px 20px 0px 20px" },
            width: "100%",
            display: { md: "flex", xs: "none" },
            boxSizing: "border-box",
          }}
        >
          <Stack>
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                gap: { lg: "106px", xs: "50px" },
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    color: `var(--white)`,
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  Our Company
                </Typography>
                <Typography
                  sx={{
                    marginTop: "20px",
                    color: "#c4c2c2",
                    textAlign: "left",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    lineHeight: "160%",
                    width: { lg: "360px", md: "300px" },
                  }}
                >
                  Grand Auto Parts, a renowned aftermarket truck parts supplier
                  of Hino, Nissan, Mitsubishi, and ISUZU since 1990. We have
                  established and specialized in Hino, ISUZU, Nissan, MITSUBISHI
                  Trucks, Trailers & Universal parts. We are the LARGEST
                  INDEPENDENT STOCKIST of the aftermarket truck parts. <br></br>
                  <br></br>
                  We have logistics in place to deliver your required orders in
                  a fast and efficient way. We provide parts worldwide,
                  including countries like Thailand, Indonesia, Malaysia,
                  Vietnam, Australia, Philippines, Laos, Bangladesh, Taiwan,
                  Cambodia, Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, UAE and
                  more. We value our reputation for accuracy, integrity, quality
                  and personalized service that we provide to clientele. We have
                  the ability to adapt to market trends and new products that
                  have maintained our brand image at the top of the market.
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    color: `var(--white)`,
                    fontSize: "18px",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  Fast Delivery
                </Typography>
                <Typography
                  sx={{
                    color: "#c4c2c2",
                    marginTop: "20px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    lineHeight: "160%",
                    width: { lg: "360px", md: "300px" },
                  }}
                >
                  Whether it is an OEM (Original Equipment Manufacturer) truck
                  part or an aftermarket truck parts, our systems both on-line
                  and in-house are the link via a high-speed communications line
                  which provides the clients with the latest pricing and stock
                  availability.
                  <br></br> <br></br>
                  <br></br> We have thousands of original and replacement truck
                  parts ready for immediate delivery. Contact our sales, whether
                  you need a maintenance part, or a major aftermarket truck part
                  to get your truck back on the road.
                </Typography>{" "}
              </Stack>
              <Stack
                sx={{
                  backgroundColor: "#292929",
                  height: "70%",
                  borderRadius: "6px",
                  gap: "1.5rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    textAlign: "left",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  Contact Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                  }}
                >
                  <LocationOnIcon sx={{ color: "var(--sky-blue)" }} />
                  <Typography
                    sx={{
                      color: "#c4c2c2",
                      textAlign: "left",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "132%",
                    }}
                  >
                    Royal Palace No. 777 Canghai Road, Yinzhou District, Ningbo
                    315000 China.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                  }}
                >
                  <PhoneIcon sx={{ color: "var(--sky-blue)" }} />
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
                  <MailIcon sx={{ color: "var(--sky-blue)" }} />
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
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "54px",
              }}
            >
              {footerList.map((item, index) => (
                <Stack key={index}>
                  <Link href={item.link}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "normal",
                        borderRight:
                          index !== footerList.length - 1
                            ? "1px solid white"
                            : "none",
                        padding: " 0 18px 0 18px ",
                        color: "var(--white)",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </Stack>
              ))}
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                marginTop: "35px",
                borderTop: "1px solid #585858",
                justifyContent: "center",
              }}
            >
              <CopyRights />
            </Stack>
          </Stack>
        </Box>
      </footer>
    </>
  );
}
