import ToggleDarkMode from "@/app/components/toggleDarkMode";
import { Dashboard } from "@/utils/enums";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function MyProfileBar() {
  const pathname = usePathname();

  const isDashboard =
    pathname.includes(Dashboard.DASHBOARD) ||
    pathname.includes(Dashboard.PROFILE) ||
    pathname.includes(Dashboard.SAVEPROMPT) ||
    pathname.includes(Dashboard.SUBSCRIPTION);

  const activeLink = pathname.replace("/", "").replace("-", " ");
  return (
    <>
      <Box
        sx={{
          //   height: '40px',
          // paddingLeft: '25px',
          paddingRight: "10px",
          boxShadow: "var(--boxshadowcolor)",
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "space-between",

          //   justifyContent: 'space-between',
          //   marginBottom: '1rem',
          // gap: {
          //   xs: '2.5rem',
          //   sm: '26rem',
          //   md: '42rem',
          // },
        }}
      >
        <Typography
          sx={{
            color: "var(--textWhite)",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {activeLink}
        </Typography>
        <ToggleDarkMode bgcolor="var(--backgroundwhite)" />
      </Box>
    </>
  );
}
