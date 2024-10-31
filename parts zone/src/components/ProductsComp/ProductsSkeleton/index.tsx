import { products } from "@/constant/productsData";
import { Grid, Skeleton } from "@mui/material";
import { Box, Stack } from "@mui/system";

const ProductsSkeleton = () => {
  return (
    <>
      <Stack>
        <Stack
          direction={"row"}
          sx={{
            margin: { md: "31px 100px 25px 100px", xs: "22px 20px 0px 20px" },
            height: "80px",
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={118} />
        </Stack>

        <Stack
          direction={"row"}
          sx={{
            marginTop: { md: "25px", xs: "0px" },
            borderTop: { md: `1px solid var(--light-grey)`, xs: "none" },
          }}
        >
          <Stack
            sx={{
              display: { md: "flex", xs: "none" },
              maxWidth: "455px",
              width: "455px",
            }}
          >
            <Skeleton variant="text" width={128} height={80} />

            <Skeleton variant="text" width={"100%"} height={118} />

            <Skeleton variant="text" width={"100%"} height={118} />
          </Stack>

          <Stack
            sx={{
              maxWidth: "985px",
              width: "985px",
              borderLeft: { md: `1px solid var(--light-grey)`, xs: "none" },
              padding: { md: "0px 44px 0px 25px", xs: "40px 20px 0px 20px" },
            }}
          >
            <Skeleton variant="text" width={128} height={80} />

            <Box
              sx={{
                margin: { md: "25px 0 34px 0", xs: " 30px 0 48px 0" },
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{
                  rowGap: { md: "50px", xs: "25px" },
                }}
              >
                {products.map((item, index) => (
                  <Grid key={index} item lg={3} sm={4} xs={6}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={168}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProductsSkeleton;
