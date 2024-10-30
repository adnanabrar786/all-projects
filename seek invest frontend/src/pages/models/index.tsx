import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const Models = dynamic(() => import("components/ui/Models/Models/Models"), {
  ssr: false,
});

export default function Page() {
  return <Models />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Models | SeekInvest">
    <Stack sx={{ paddingX: "2rem", paddingBottom: "4rem", paddingTop: "2rem" }}>
      {page}
    </Stack>
  </AppLayout>
);
