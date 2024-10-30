"use client";

// import CrossIcon from '@/assets/icons/crossIcon.svg';
// import TickIcon from '@/assets/icons/tickIcon.svg';
import { exo, poppins } from "@/components/ThemeRegistry/theme";
import BackgroundOverlay from "@/components/common/BackgroundOverlay";
import CustomContainedButton from "@/components/common/CustomContainedButton";
import { Colors } from "@/utils/enums/colors";
import CrossIconSmall from "@mui/icons-material/Clear";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, Grid, Stack, Typography } from "@mui/material";

import { ReactNode } from "react";
interface Props {
  title: string;
  price: string;
  Icon: ReactNode;

  description?: string;
  bgColor: string;
  color: string;
  buttonBg: string;
  buttonColor: string;
  buttontext: string;
}

const PricingCard = ({
  title,
  price,
  Icon,

  description,
  bgColor,
  color,
  buttonColor,
  buttonBg,
  buttontext,
}: Props) => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
      item
      md={4}
    >
      <Box
        sx={{
          opacity: title.includes("Premium") ? 1 : 0,
          display: "flex",
          // position: 'absolute',
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          top: "-42px",
          alignItems: "center",
          justifyContent: "center",
          width: { md: "18.1875rem", sm: "18.12131rem", xs: "15.74506rem" },
          height: {
            md: "3.6875rem",
            sm: "2.88181rem",
            xs: "2.50394rem",
          },
          bgcolor: "#2D969B",
          // border: '2px solid #2D969B',
          // borderRadius: '10px',
          alignSelf: "center",
        }}
      >
        {/* <Typography
            sx={{
              position: 'absolute',
              padding: '0.5rem',

              bgcolor: '#2D969B',
              top: '-24px',
              alignItems: 'center !important',
            }}
          > */}
        Recommended
        {/* </Typography> */}
      </Box>

      <Stack
        sx={{
          width: "100%",
          padding: "2rem",
          display: "flex",
          backgroundColor: title.includes("Free")
            ? "rgba(255, 255, 255, 0.2)"
            : "transparent",
          backdropFilter: "blur(5px)",
          borderRadius: "1.4375rem",
          // height: '30.125rem',
          // width: { sm: '29.55094rem', md: '25.67594rem', lg: '37.5rem' },
          // paddingY: '1.7rem',

          flexDirection: "column",
          alignItems: "start",
          textAlign: "center",
          border: `0.13rem solid ${Colors.ZOMP}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: exo.style.fontFamily,
            color: "#ffffff",
            fontSize: {
              lg: "3.75rem",
              md: "2.93069rem",
              xs: "2.53069rem",
            },
            textAlign: "left",
            fontStyle: "normal",
            fontWeight: "800",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: {
              lg: "1.5rem",
              md: "1.17225rem",
              xs: "1.01856rem",
            },
            fontWeight: "600",
            color: color,
            alignItems: "center",
          }}
        >
          ${price}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            // alignItems: 'left',
            paddingY: "0.9rem",
          }}
        >
          {Icon}
          <Typography
            sx={{
              color: "#fff",
              textAlign: "left",
              fontFamily: poppins.style.fontFamily,

              fontSize: {
                lg: "1.5rem",
                // md: '1.07225rem',
                // xs: '1.01856rem',
                md: "16.297px",
                xs: "18.756px",
              },
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            // alignItems: 'left',
            paddingY: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          {/* <TickIcon /> */}
          <DoneOutlinedIcon
            sx={{
              width: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
              height: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
              color: "#2D969B",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              // textAlign: 'center',
              textAlign: "left",
              fontSize: {
                lg: "1.5rem",
                md: "16.297px",
                xs: "18.756px",
              },
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            Upto 3 suggestion Prompts
          </Typography>
        </Box>

        {/* <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            color: color || Colors.BLACK_OLIVE,
            fontSize: '1.5rem',
          }}
        >
          Per Month
        </Typography> */}

        {/* <Divider
          sx={{
            width: '100%',
            marginTop: '1rem',
            borderColor: Colors.PHILIPPINE_SILVER,
          }}
        /> */}

        {/* <Typography
          sx={{
            textTransform: 'capitalize',
            fontSize: { lg: '1.25rem', xs: '1.125rem' },
            lineHeight: '1.90625',
            color: color,
            padding: '1.88rem',
            fontFamily: poppins.style.fontFamily,
          }}
        >
          We are in beta testing right now. It will be free to use in beta
          testing. Once it is out of beta we will charge for this services.
        </Typography> */}

        <Box sx={{ width: "100%" }}>
          <CustomContainedButton
            text={buttontext}
            sx={{
              width: { sm: "14.99525rem", md: "13.02894rem", lg: "19.1875rem" },
              height: "4.5rem !important",

              backgroundColor: buttonBg,
              color: buttonColor,
              ":hover": {
                backgroundColor: buttonBg,
              },
            }}
          />
        </Box>
      </Stack>
    </Grid>
  );
};

const pricings = [
  {
    title: "Free",
    key: "first",
    price: "0/ Month",
    // Icon: <CrossIcon />,
    Icon: (
      <CrossIconSmall
        sx={{
          color: "#FF2323",
          width: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
          height: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
        }}
      />
    ),
    bgColor: "#121013",
    color: "#FFFFFF",
    description: "Only 10 Prompts a Month",
    buttontext: "Try For Free",
    buttonBg: "white",
    buttonColor: "#000000",
  },
  {
    title: "Premium",
    key: "second",
    price: "4.99/ Month",
    // Icon: <TickIcon />,
    Icon: (
      <DoneOutlinedIcon
        sx={{
          width: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
          height: { lg: "2.5rem", sm: "1.95375rem", xs: "1.69756rem" },
          color: "#2D969B",
        }}
      />
    ),
    buttontext: "Try Premium",
    description: "Unlimited Prompts",
    bgColor: "#121013",
    color: "#FFFFFF",
    buttonBg: Colors.ZOMP,
    buttonColor: "#ffffff",
  },
];
const PricingSection = () => {
  return (
    <Stack
      id="pricing"
      sx={{
        marginTop: { lg: "0", xs: "10rem" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: { lg: "100vh" },
        color: "white",
        position: "relative",
        padding: { lg: "0", xs: "0rem" },
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "4rem", sm: "3.4375rem", xs: "2.5rem" },
          fontWeight: "700",
          span: { color: "#2D969B" },
        }}
      >
        OUR <span>PRICING</span>
      </Typography>

      <Grid
        spacing={2}
        container
        sx={{ justifyContent: "center", marginTop: "5rem" }}
      >
        {pricings.map((pricing) => (
          <PricingCard
            title={pricing.title}
            key={pricing.key}
            Icon={pricing.Icon}
            description={pricing.description}
            bgColor={pricing.bgColor}
            price={pricing.price}
            color={pricing.color}
            buttonColor={pricing.buttonColor}
            buttonBg={pricing.buttonBg}
            buttontext={pricing.buttontext}
          />
        ))}
      </Grid>

      {/* ******************** BACKGROUND OVERLAY ********************** */}
      <BackgroundOverlay left={0} />
    </Stack>
  );
};

export default PricingSection;
