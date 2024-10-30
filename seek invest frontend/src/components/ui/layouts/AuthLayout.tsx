import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  heading?: string;
  logo?: boolean;
  children: ReactNode;
};

const HomeLogo = dynamic(() => import("components/common/HomeLogo"), {
  ssr: false,
});

export default function AuthLayout({ heading, children, logo = true }: Props) {
  return (
    <>
      <Head>
        <title>{heading}</title>
      </Head>
      {logo && <HomeLogo />}
      <Stack
        component="main"
        sx={{
          alignItems: "center",
          flexGrow: 1,
          backgroundColor: "var(--background-color1)",
          minHeight: "100vh",
        }}
      >
        <Stack
          maxWidth="lg"
          sx={{
            paddingBottom: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: { md: "initial", xs: "center" },
          }}
        >
          {children}
        </Stack>
      </Stack>
    </>
  );
}
