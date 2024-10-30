import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const Model = dynamic(
  () => import("components/ui/Models/Models/NewModel/Model"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <Model />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="New Model | SeekInvest">
    <Stack sx={{ paddingX: "2rem", paddingBottom: "4rem", paddingTop: "2rem" }}>
      {page}
    </Stack>
  </AppLayout>
);
