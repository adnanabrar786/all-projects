import '../styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Amplify } from 'aws-amplify';
import { LOGROCKET_KEY } from 'config/environment';
import { AppPropsWithLayout } from 'interfaces/pages';
import LogRocket from 'logrocket';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../aws-config';

const Script = dynamic(() => import('next/script'), { ssr: false });

Amplify.configure({
  ...config,
  ssr: true,
});

const queryClient = new QueryClient();

if (typeof window !== 'undefined') {
  LogRocket.init(`${LOGROCKET_KEY}`);
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const [isBeaconVisible, setIsBeaconVisible] = useState(true);

  useEffect(() => {
    const excludedPaths = ['/login', '/signup'];
    setIsBeaconVisible(!excludedPaths.includes(router.pathname));
  }, [router.pathname]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app">
        {!isBeaconVisible && (
          <style>
            {`
            #beacon-container {
              display: none;
            }

          `}
          </style>
        )}

        <style>
          {`
        .customChatBot {
          display: none !important;
        }
          `}
        </style>
        {getLayout(<Component {...pageProps} />)}
        <span style={{ zIndex: 100000 }}>
          <NextNProgress color="#008080" height={5} showOnShallow options={{ easing: 'ease', speed: 500 }} />
          {
            <Script
              type="text/javascript"
              id="beacon-intialize"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              function loadHelpScoutBeacon() {
                !function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});
                window.Beacon('init', 'a1092b1e-cd02-4346-8e77-075ce1ac2d66');
              }
              loadHelpScoutBeacon();
            `,
              }}
            />
          }
          <ToastContainer />
        </span>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
