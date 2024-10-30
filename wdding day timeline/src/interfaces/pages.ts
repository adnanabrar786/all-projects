import { AppProps } from 'next/app';

import { ReactElement, ReactNode } from 'react';
import { ToastInfo } from '../hooks/useToast';

export type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface PageProps {
  showToast?: (info: ToastInfo) => void;
}
