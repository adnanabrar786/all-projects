import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const AppLayout = dynamic(() => import("components/ui/layouts/AppLayout"), {
  ssr: false,
});

const ReviewModel = dynamic(
  () => import("components/ui/Models/Models/ReviewModel"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ReviewModel />;
}

Page.getLayout = (page: JSX.Element) => (
  <AppLayout heading="Review Models | SeekInvest">
    <Stack sx={{ paddingX: "2rem", paddingBottom: "4rem", paddingTop: "2rem" }}>
      {page}
    </Stack>
  </AppLayout>
);
