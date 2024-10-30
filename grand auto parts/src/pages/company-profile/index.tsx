import Head from "next/head";
import Company from "@/components/Company";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Company Profile</title>
      </Head>
      <Company />
    </div>
  );
}
