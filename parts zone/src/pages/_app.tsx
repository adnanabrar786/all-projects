import Layout from "@/components/Layout";
import theme from "@/components/ThemeRegistry/theme";
import AppState from "@/context/appContext";
import "@/style/global.css";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";

interface MyAppProps extends AppProps {
  data: any;
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps, data }: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppState>
          <Layout>
            <Toaster reverseOrder={false} />
            <NextNProgress
              color="var(--dark-blue)"
              height={5}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </Layout>
        </AppState>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
