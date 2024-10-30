import { Fragment } from 'react';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { LOGIN_URL, SALE_URL } from 'routes';
import HTMLHeader from 'components/common/Head';
import Header from 'components/ui/Layout/Header';
import Sidebar from 'components/ui/Layout/Sidebar';
import { AppLoader } from 'components/common/AppLoader';
import { USER_ID_KEY } from 'constants/localStorage';

type Props = {
  children: JSX.Element | JSX.Element[];
  heading?: string;
};

function Layout({ children, heading }: Props) {
  const router = useRouter();
  const { isLoading, unauthenticated } = useAuth();

  function conditionalRender() {
    if (isLoading) {
      return <AppLoader />;
    }
    const userId = localStorage.getItem(USER_ID_KEY);

    if (unauthenticated && userId) {
      router.replace(SALE_URL);
      return <></>;
    }
    if (unauthenticated) {
      router.replace(LOGIN_URL);
      return <></>;
    }

    return (
      <Fragment>
        <HTMLHeader heading={heading} />
        <div className="flex">
          <Sidebar />
          <main className="min-w-[calc(100vw_-_290px)] w-full">
            <Header />
            {children}
          </main>
        </div>
      </Fragment>
    );
  }

  return conditionalRender();
}

export default Layout;
