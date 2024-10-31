import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Image from "next/image";
import Aboutheading from "./Aboutheading";

export default function AboutUspage() {
  return (
    <Box
      sx={{
        backgroundColor: "#F7F8FB",
      }}
    >
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{
          margin: { md: "0px 64px 0 100px", sm: "0px 31.5px", xs: "0px 15px" },
          padding: { md: "16px 0 100px 0", sm: "40px 0", xs: "30px 0 40px 0" },
          display: "flex",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            borderRadius: "6px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Krona One",
              color: "var(--dark-blue)",
              fontSize: { sm: "40px", xs: "30px" },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              textAlign: "center",
              width: { lg: "238px", md: "238px", sm: "100%" },
              marginTop: { md: "36px", sm: "0px" },
            }}
          >
            About Us
          </Typography>
        </Stack>
        <Stack
          sx={{
            backgroundColor: "transparent",
            borderRadius: "6px",
            marginLeft: { lg: "80px", md: "40px", sm: "0px" },
          }}
        >
          <Stack
            direction={{ lg: "row", md: "column" }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "var(--text-grey)",
                width: { lg: "466px", xs: "100%" },
                textAlign: "left",
                fontSize: { md: "16px", xs: "14px" },
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "32px",
                marginTop: { md: "36px", sm: "40px", xs: "30px" },
              }}
            >
              Grandautoparts is the certified truck parts dealer which is
              operating on a global spectrum to provide the best truck parts. If
              your truck hit a tree or went through a horrible collision, your
              truck will require the perfectly working replacement spare parts
              or Original Equipment Manufacturer (OEM). Grandautoparts helps you
              buy the best quality models covering all the big brands and
              models. We boast of a large warehouse of auto parts and
              accessories at highly affordable discount rates.
            </Typography>
            <Stack
              sx={{
                display: { md: "block", xs: "none" },
              }}
            >
              <Image
                src={"/about.svg"}
                priority
                quality={100}
                width={328.06}
                height={328.06}
                alt="pic"
              />
            </Stack>
          </Stack>

          <Aboutheading
            sx={{
              textAlign: { md: "left", xs: "center" },
            }}
            heading="Here are highlights of some of the best features we have to offer:"
          />

          <Typography
            sx={{
              color: "var(--text-grey)",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "32px",
              marginTop: "20px",
              fontSize: { md: "16px", xs: "14px" },
            }}
          >
            We offer a high range of options to choose from: Original Equipment
            Manufacturer products and replacement parts have become much popular
            these days for being cost effective. Buying aftermarket parts gives
            you the privilege of scrolling down through multiple choices to
            select the one which is closest to your automotive needs. If you
            choose to buy these parts through commercial wholesale suppliers, it
            will result in a lot more work for you to search the best product.
            It's just Because it gets complicated for the customer to determine
            the best model or brand for them as many companies manufacture
            products which are functionally same in nature but have different
            specialties and adversities. However, our company offers you a wide
            range of parts right under one placement so you can quickly sort the
            product you want to buy and then compare the product with its pros
            and cons before making the final purchase. For instance, if you are
            willing to buy engine & suspension parts for your vehicle, our
            website will give a detailed comparison of engine & suspension parts
            manufactured by different brands along with their unique
            specifications and models. It will make it easy for you to take the
            final decision.
          </Typography>

          <Aboutheading
            sx={{
              textAlign: { md: "left", xs: "center" },
            }}
            heading="A variety of discount parts, our products are in reach of everyone
              who wishes to buy high-quality Aftermarket Truck Parts:"
          />
          <Typography
            sx={{
              color: "var(--text-grey)",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "32px",
              marginTop: "20px",
              fontSize: { md: "16px", xs: "14px" },
            }}
          >
            Our customer service system is operation 24/7 providing assistance
            to all the buyers of aftermarket truck parts, answering the
            inquiries and giving attention to every detail as the client is the
            king for our company. The Website is highly user friendly, in which
            brilliant graphics helps the customer to view the parts correctly.
            Moreover, parts are sorted by each product, so you know what you
            have to choose for the parts you desire. The complete brand listing
            will help you navigate smoothly from one brand to another one,
            allowing the customer to compare the specifications and quality.
          </Typography>

          <Stack
            sx={{
              display: { md: "none", xs: "flex" },
              marginTop: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={"/about.svg"}
              priority
              quality={100}
              width={328.06}
              height={328.06}
              alt="pic"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
