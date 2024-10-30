import { poppins } from "@/components/ThemeRegistry/theme";
import { fotterIcon } from "@/config/data";
import { Box, Stack } from "@mui/material";
import Link from "next/link";

export default function FooterIcons() {
  return (
    <>
      <Stack direction={"row"} spacing={5}>
        <Box
          sx={{
            width: "2rem",
            display: "flex",
            gap: "2.75rem",
          }}
        >
          {fotterIcon.map(({ link, icon: Icon }) => (
            <Link target="_blank" href={link}>
              <Box
                sx={{
                  fontSize: "1.375rem",
                  fontFamily: poppins.style.fontFamily,
                  cursor: "pointer",
                  display: "grid",
                  alignItems: "center",
                  height: "2rem",
                  width: "2rem",
                  color: "#fff",
                  ":hover": {
                    color: "#2D969B",
                    svg: {
                      fill: "#2D969B",
                    },
                  },
                  svg: {
                    fill: "white",
                  },
                }}
              >
                <Icon
                  sx={{
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              </Box>
            </Link>
          ))}
        </Box>
      </Stack>
    </>
  );
}
