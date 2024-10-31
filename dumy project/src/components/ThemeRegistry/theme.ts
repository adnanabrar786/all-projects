import { createTheme } from "@mui/material/styles";
import {
  Exo_2,
  Inter,
  Krona_One,
  Lato,
  Open_Sans,
  Poppins,
  Roboto,
} from "next/font/google";
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

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const kronaOne = Krona_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
export const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: lato.style.fontFamily,
  },
  // for break points
  // breakpoints: {
  //   values: {
  //     xs: 375,
  //   },
  // },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
