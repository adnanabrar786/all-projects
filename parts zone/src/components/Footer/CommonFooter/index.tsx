import { footerList } from "@/constant/data";
import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import CopyRights from "../CopyRights";

export default function CommonFooter() {
  return (
    <>
      <Box
        sx={{
          color: "white",
          backgroundColor: "transparent",
          width: "full",
          height: { md: "6rem", xs: "auto" },
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <Grid
          rowSpacing={2}
          container
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {footerList.map((item, index) => (
              <Stack key={index}>
                <Link href={item.link}>
                  <Typography
                    sx={{
                      fontSize: { sm: "12px", xs: "10px" },
                      cursor: "pointer",
                      borderRight:
                        index !== footerList.length - 1
                          ? "1px solid #fff"
                          : "none",
                      paddingX: { sm: "18px", xs: "4.5px" },
                      color: "var(--white)",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </Stack>
            ))}
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            height: "0.5px",
            justifyContent: "center",
            backgroundColor: "#585858",
            marginTop: "1rem",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid>
            <CopyRights />
          </Grid>
        </Box>
      </Box>
    </>
  );
}
