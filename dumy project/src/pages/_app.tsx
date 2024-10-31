import Layout from "@/components/Layout";
import theme from "@/components/ThemeRegistry/theme";
import "@/style/global.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "swiper/css";
import "swiper/css/navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
