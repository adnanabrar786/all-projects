import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import awsmobile from '@/aws-exports';
import Layout from '@/components/Layout/Layout';
import UserState from '@/context/user/UserState';
import '@/styles/globals.css';
import theme from '@/theme/theme';

Amplify.configure(awsmobile);

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserState>
          <Layout>
            <Toaster reverseOrder={false} />
            <Component {...pageProps} />
          </Layout>
        </UserState>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
