import ShowAppLoaderOrContent from 'components/common/ShowAppLoaderOrContent';
import Layout from 'components/ui/Layout';
import { useRouter } from 'next/router';
import { ROOT_URL } from 'routes';

export default function Page() {
  const router = useRouter();
  router.push(ROOT_URL);
  return (
    <ShowAppLoaderOrContent data={true}>
      <></>
    </ShowAppLoaderOrContent>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading="WeddingDayTimeline - Home">{page}</Layout>;
};
