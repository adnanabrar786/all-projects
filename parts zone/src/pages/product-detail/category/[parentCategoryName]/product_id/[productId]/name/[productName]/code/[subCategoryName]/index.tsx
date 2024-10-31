import Head from "next/head";
import { fetchAPI } from "@/utils/fetch";
import ProductsDetails from "@/components/ProductsDetails";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GET_PRODUCTS } from "@/routes/api";
import { BASE_URL } from "@/config/environment";

const index = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{`${product.data.product.name} - Grand Auto Parts`}</title>
        <meta
          name="description"
          content={`${product.data.product.meta_description}`}
        />
        <meta
          name="keywords"
          content={`${product.data.product.meta_keywords}`}
        />
        <link rel="canonical" href={`/products/${product.data.product.id}`} />
        <meta charSet="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        {/* Seo for Facebook */}
        <meta property="og:title" content="..."></meta>
        <meta property="og:description" content="..."></meta>
        <meta property="og:image" content="..."></meta>
        <meta property="og:url" content="..."></meta>
        <meta property="og:type" content="..."></meta>
        {/* (e.g., article, website) */}

        <meta name="robots" content="index,follow"></meta>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org/",
              "@type": "Product",
              name: product.data.product.name,
              description: product.data.product.meta_description,
              keywords: product.data.product.meta_keywords,
            }),
          }}
        />
      </Head>

      <ProductsDetails product={product} />
    </>
  );
};

export default index;

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async (context) => {
  const queryParams = context.query;
  const product = await fetchAPI(
    `${BASE_URL}${GET_PRODUCTS}/${queryParams.productId}`
  );

  return { props: { product: product ?? [] } };
}) satisfies GetServerSideProps<{
  product: Repo;
}>;
