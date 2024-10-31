import { getProductOptionById } from "@/api/service/product-option.service";
import Home from "@/components/Home/Home";
import Head from "next/head";

interface Props {
  cabinAndBodyParts: any;
  engineAndSuspensionParts: any;
  trailerAndUniversalParts: any;
}

export default function Page({
  cabinAndBodyParts,
  engineAndSuspensionParts,
  trailerAndUniversalParts,
}: Props) {
  return (
    <>
      <Head>
        <title>Parts-Zone</title>
      </Head>
      <Home
        cabinAndBodyParts={cabinAndBodyParts}
        engineAndSuspensionParts={engineAndSuspensionParts}
        trailerAndUniversalParts={trailerAndUniversalParts}
      />
    </>
  );
}

export async function getStaticProps() {
  const [
    cabinAndBodyParts,
    engineAndSuspensionParts,
    trailerAndUniversalParts,
  ] = await Promise.all([
    getProductOptionById(41),
    getProductOptionById(42),
    getProductOptionById(43),
  ]);

  return {
    props: {
      cabinAndBodyParts: cabinAndBodyParts || [],
      engineAndSuspensionParts: engineAndSuspensionParts || [],
      trailerAndUniversalParts: trailerAndUniversalParts || [],
    },
  };
}
