import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";

interface Props {
  bgcolor: string;
}

export default function ToggleDarkMode({ bgcolor }: Props) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Box
        sx={{
          //   width: '100%',
          // height: '4.375rem',
          height: "4.375rem",
          //   backgroundColor: 'var(--backgroundwhite)',
          backgroundColor: "var(--backgroundsidebar)",
          display: "flex", // Make children flex items

          justifyContent: "flex-end",
        }}
      >
        {/* <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <DarkModeIcon
              sx={{
                color: "var(--textWhite)",
                marginRight: "0.3rem",
              }}
            />
          </Button> */}
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <DarkModeIcon
              sx={{
                color: "var(--textWhite)",
                marginRight: "0.3rem",
              }}
            />
          ) : (
            <LightModeIcon
              sx={{
                color: "#2D969B",
                marginRight: "0.3rem",
              }}
            />
          )}
        </Button>
      </Box>
    </>
  );
}
