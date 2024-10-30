import App from "components/ui/App/App";
import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("components/ui/layouts/AuthLayout"), {
  ssr: false,
});
export default function Page() {
  return <App />;
}

Page.getLayout = (page: JSX.Element) => (
  <AuthLayout heading="App | SeekInvest" logo={false}>
    {page}
  </AuthLayout>
);
