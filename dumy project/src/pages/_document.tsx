import { lato } from "@/components/ThemeRegistry/theme";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className={lato.className}>
      <Head />
      {/* <link rel="icon" href="/logo.png" sizes="1000" /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
