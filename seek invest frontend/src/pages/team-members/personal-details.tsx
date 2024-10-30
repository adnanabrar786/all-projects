import { PERSONAL_SETTINGS } from "constants/pages.routes";
import dynamic from "next/dynamic";
import Head from "next/head";
import { getFirm } from "services/firm.services";

const PersonalDetails = dynamic(
  () => import("components/ui/onboardings/PersonalDetails"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <Head>
        <title>Personal Details | SeekInvest</title>
      </Head>
      <PersonalDetails />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await getFirm(context?.req?.cookies?.token);

  if (data && data.data) {
    return {
      redirect: {
        destination: PERSONAL_SETTINGS,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
