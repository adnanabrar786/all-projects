import dynamic from "next/dynamic";
import Head from "next/head";

const SignUp = dynamic(
  () => import("components/ui/TeamMembers/SignUp/SignUp"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign up | SeekInvest</title>
      </Head>
      <SignUp />
    </>
  );
}
