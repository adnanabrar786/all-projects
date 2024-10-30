import FeatureDesc from "@/app/components/FeatureDesc";
import PromptBox from "@/assets/images/promptBox.png";
import BackgroundOverlay from "@/components/common/BackgroundOverlay";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Introduction = () => {
  return (
    <>
      <Grid
        id="prompt"
        container
        columnSpacing={{ md: 6, xs: 0 }}
        sx={{
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",

          // minHeight: { md: '100vh' },
          color: "white",
          position: "relative",
          // overflow: "hidden",
          width: "100%",
          padding: { lg: "0", xs: "2rem 1.69rem" },
        }}
      >
        <Grid item md={6} xs={6}>
          <Typography
            sx={{
              width: { lg: "100%", sm: "20.6875rem", xs: "90%" },
              fontSize: { md: "4rem", sm: " 3rem", xs: "2.5rem" },
              fontWeight: "700",
              textTransform: "uppercase",
              span: { color: "var(--primary)" },
              lineHeight: {
                lg: "4.34375rem",
                sm: "4.34375rem",
                xs: "3.125rem",
              },
            }}
          >
            Prompt Library
          </Typography>
          <FeatureDesc />
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            position: "relative",
            height: { lg: "25.125rem", sm: "20.0625rem", xs: "18.625rem" },
            justifyContent: { lg: "center" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: "20vh",
              position: "absolute",
              top: "6.5rem",
            }}
          >
            {PromptBox && (
              <Image
                priority
                quality={100}
                src={PromptBox}
                alt="prompt"
                fill
                // style={{ objectFit: 'cover' }}
              />
            )}
          </Box>

          {/* ******************** PROMPT BOX ********************** */}
          {/* <Stack
            sx={{
              width: { lg: "15.625rem", sm: "15.625rem", xs: "12.4375rem" },
              // backgroundColor: 'var(--darkPrimary)',
              border: `0.25px solid #FFF`,
              background: "rgba(255, 255, 255, 0.20)",
              backdropFilter: "blur(5px)",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginTop: "6rem",
              marginLeft: "4.5rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: "700",
                lineHeight: "2rem",
                textTransform: "capitalize",
              }}
            >
              Prompt to create illustration1
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Blue and green color mars rover over planet mars
            </Typography>
          </Stack> */}

          {/* ******************** INFINITE CRAFT RESULT ********************** */}
          {/* <Stack
            sx={{
              width: { lg: "15.625rem", sm: "15.625rem", xs: "14rem" },
              // backgroundColor: 'var(--primary)',
              // border: '1px solid #FFF',
              border: `0.25px solid #FFF`,
              background: "rgba(255, 255, 255, 0.20)",
              backdropFilter: "blur(5px)",
              borderRadius: "0.5rem",
              padding: "1rem",

              position: "absolute",
              left: { lg: "21.5rem", sm: "9.5rem", xs: "4rem" },
              top: { lg: "10rem", sm: "7.5rem", xs: "9.5rem" },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: "700",
                lineHeight: "2rem",
                textTransform: "capitalize",
              }}
            >
              Prompt to create illustration2
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Blue and green color mars rover over planet mars
            </Typography>
          </Stack> */}

          {/* ******************** LINES AND IMAGE ********************** */}

          {/* <Box
            sx={{
              position: 'relative',
              right: { lg: '5rem', sm: '25rem', xs: '13.8rem' },
              bottom: '3rem',
              zIndex: '-1',
            }}
          > */}
          {/* <Box
              sx={{
                // position: 'relative',

                width: { xs: '5rem', lg: '5rem' },
                height: '5rem',
                img: {
                  objectFit: 'contain',
                  right: '0',
                },
              }}
            > */}

          {/* <Stack
            sx={{
              width: { lg: "15.625rem", sm: "15.625rem", xs: "15.625rem" },
              // backgroundColor: 'var(--darkPrimary)',
              border: `0.25px solid #FFF`,
              background: "rgba(255, 255, 255, 0.20)",
              backdropFilter: "blur(5px)",
              borderRadius: "0.5rem",
              padding: "1rem",
              zIndex: "-1",
              position: "relative",
              bottom: "0.8rem",
              marginLeft: "1.5rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: "700",
                lineHeight: "2rem",
                textTransform: "capitalize",
              }}
            >
              Prompt to create illustration3
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "0.625rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Blue and green color mars rover over planet mars
            </Typography>
          </Stack> */}
        </Grid>

        {/* ******************** BACKGROUND OVERLAY ********************** */}
        <BackgroundOverlay right={0} />
      </Grid>
    </>
  );
};

export default Introduction;
