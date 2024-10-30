import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { Font } from "@react-pdf/renderer";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { POSTHOG_HOST, POSTHOG_KEY } from "constants/environment";
import {
  InterBold,
  InterFont,
  InterMedium,
  InterRegular,
  InterSemiBold,
} from "constants/fonts.routes";
import AssessmentState from "context/assessment/AssessmentState";
import CompanyState from "context/firm/CompanyState";
import ModelState from "context/model/ModelContext";
import UserState from "context/user/UserState";
import { EFontWeights } from "enums/enums";
import { AppPropsWithLayout } from "interfaces/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import "react-advanced-cropper/dist/style.css";
import "react-phone-number-input/style.css";
import createEmotionCache from "src/theme/createEmotionCache";
import theme from "src/theme/theme";
import "styles/globals.css";
import "swiper/css";

const { NORMAL, MEDIUM, SEMIBOLD, BOLD } = EFontWeights;

if (typeof window !== "undefined" && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    disable_session_recording: true,
    person_profiles: "identified_only",
    api_host: POSTHOG_HOST,
  });
}

Font.register({
  family: InterFont,
  fonts: [
    {
      src: InterRegular,
      fontWeight: NORMAL,
    },
    {
      src: InterMedium,
      fontWeight: MEDIUM,
    },
    {
      src: InterSemiBold,
      fontWeight: SEMIBOLD,
    },
    {
      src: InterBold,
      fontWeight: BOLD,
    },
  ],
});

Font.registerHyphenationCallback((word) => {
  return [word];
});

const Layout = dynamic(() => import("components/ui/layouts/Layout"), {
  ssr: false,
});

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

export default function App(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <UserState>
            <CompanyState>
              <AssessmentState>
                <ModelState>
                  <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
                    </Hydrate>
                  </QueryClientProvider>
                </ModelState>
              </AssessmentState>
            </CompanyState>
          </UserState>
        </ThemeProvider>
      </CacheProvider>
    </PostHogProvider>
  );
}
