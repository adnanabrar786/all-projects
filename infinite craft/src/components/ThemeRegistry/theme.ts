import { Colors } from "@/utils/enums/colors";
import { createTheme } from "@mui/material/styles";
import { Exo_2, Inter, Open_Sans, Poppins } from "next/font/google";
export const exo = Exo_2({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});
export const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 961,
      lg: 1440,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: Colors.ZOMP },
    secondary: { main: Colors.ZOMP },
    mode: "light",
  },

  typography: {
    fontFamily: exo.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          fontFamily: poppins.style.fontFamily,
        },
        contained: {
          fontFamily: poppins.style.fontFamily,
        },
        text: {
          textTransform: "none",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: Colors.BLUE_JEANS,
          }),
        }),
      },
    },
  },
});

export default theme;
