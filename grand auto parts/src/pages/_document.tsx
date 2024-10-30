import { lato } from "@/components/ThemeRegistry/theme";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ fontFamily: lato.fontFamily }}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
