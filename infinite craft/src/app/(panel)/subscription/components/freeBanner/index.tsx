import CircledTick from "@/assets/icons/circledTick.svg";
import { exo, poppins } from "@/components/ThemeRegistry/theme";
import { premiumUser } from "@/services/user.service";
import { RootState } from "@/store";
import { infoMessage } from "@/utils/enums";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface Props {
  title: string;
  price: string;
  Icon: ReactNode;

  description?: string;
  bgColor: string;
  color: string;
}

export default function FreeBanner({
  title,
  price,
  Icon,

  description,
  bgColor,
  color,
}: Props) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const token = user.token;
  const premium: string = user.subscription;

  const premiumHandler = async () => {
    if (premium === "PREMIUM") {
      infoMessage("Already Premium User");
    } else {
      const { data } = await premiumUser(token);
      if (data) {
        router.push(data.url);
      }
    }
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
        item
        md={6}
        xs={12}
      >
        <Stack
          sx={{
            padding: "1.5rem",
            display: "flex",
            backgroundColor: bgColor,

            borderRadius: "0.5rem",
            height: {
              md: "12.5rem",
              sm: "11.73206rem",
              xs: "9.33256rem",
            },
            // width: '35rem',
            width: "100%",

            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            border: `0.13rem solid #b0d8da`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignSelf: "auto",

              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: exo.style.fontFamily,
                color: color,
                fontSize: { md: "1.5rem", sm: "1.40788rem", xs: "0.83194rem" },
                textAlign: "left",
                fontStyle: "normal",
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
            {(title.includes("Free") && premium !== "PREMIUM") ||
            (title.includes("Premium") && premium === "PREMIUM") ? (
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  // marginTop: '0.1rem',
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: title.includes("Free") ? "#2D969B" : "white",
                    fontSize: {
                      md: "1rem",
                      sm: "0.93856rem",
                      xs: "0.55463rem",
                    },
                  }}
                >
                  Current plan
                </Typography>
                <CircledTick />
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: {
                md: "1rem",
                sm: "0.93856rem",
                xs: "0.55463rem",
              },
              fontWeight: "400",
              color: color,
            }}
          >
            {price}
          </Typography>

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                alignItems: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  // alignItems: 'left',
                  // paddingY: "1rem",
                  paddingTop: "1rem",
                }}
              >
                {/* <CrossIconSmall /> */}
                {Icon}
                <Typography
                  sx={{
                    color: color,
                    textAlign: "start",
                    fontFamily: poppins.style.fontFamily,

                    fontSize: {
                      md: "1rem",
                      sm: "0.93856rem",
                      xs: "0.55463rem",
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
                <DoneOutlinedIcon
                  sx={{
                    width: { md: "1.5rem", sm: "1.40788rem", xs: "0.83194rem" },
                    height: {
                      md: "1.5rem",
                      sm: "1.40788rem",
                      xs: "0.83194rem",
                    },
                    color: title.includes("Free") ? "#2D969B" : "white",
                  }}
                />
                <Typography
                  sx={{
                    color: color,
                    textAlign: "start",
                    fontSize: {
                      md: "1rem",
                      sm: "0.93856rem",
                      xs: "0.55463rem",
                    },
                    fontWeight: "400",
                    fontStyle: "normal",
                  }}
                >
                  Upto 3 suggestion Prompts
                </Typography>
              </Box>
            </Box>
            {title.includes("Premium") ? (
              <Button
                sx={{
                  backgroundColor: "#fff !important",
                  width: { md: "9.9375rem", sm: "9.327rem", xs: "5.51144rem" },

                  height: {
                    md: "4.5rem",
                    sm: "4.22356rem",
                    xs: "2.49575rem",
                  },
                  fontSize: {
                    md: "0.875rem",
                    sm: "0.82125rem",
                    xs: "0.48531rem",
                  },
                  // '&:hover': {
                  //   background: 'transparent', // Disable hover effect
                  //   color: '#fff', // Set the text color on hover
                  // },

                  marginTop: "1rem",
                }}
                onClick={premiumHandler}
              >
                {/* <Typography
                  sx={{
                    color: '#2D969B',
                  }}
                > */}
                Try Premium
                {/* </Typography> */}
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Stack>
      </Grid>
    </>
  );
}
