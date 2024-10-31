import ProductsComp from "@/components/ProductsComp";
import { CATEGORIES } from "@/components/config/route/pages.routes";
import { BASE_URL } from "@/config/environment";
import { fetchAPI } from "@/utils/fetch";
import { ICategoryProducts } from "@/utils/interfaces/interfaces";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

const index = ({
  category_filter_option,
  allItemsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Grand Auto Parts</title>
      </Head>
      <ProductsComp
        category_filter_option={category_filter_option}
        allItemsData={allItemsData}
      />
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<ICategoryProducts> = async (
  context
) => {
  let categoryFilterOption = [];
  try {
    const queryParams = context.query;

    categoryFilterOption = await fetchAPI(`${BASE_URL}${CATEGORIES}`);

    let url = "";
    const subcategory_Id = queryParams.category
      ? queryParams.category[5]
      : undefined;
    const category_Id = queryParams.category
      ? queryParams.category[1]
      : undefined;
    const search = queryParams.search;
    const optionId = queryParams.option_id;
    const page = queryParams.page;

    try {
      if (optionId) {
        url = `${BASE_URL}/product-options/?option_id=${optionId}&page=${
          page ?? 1
        }`;
      } else if (category_Id) {
        url = `${BASE_URL}/categories-products?category_id=${category_Id}&page=${
          page ?? 1
        }`;
      } else if (subcategory_Id) {
        url = `${BASE_URL}/subcategories-products?subcategory_id=${subcategory_Id}&page=${
          page ?? 1
        }`;
      } else {
        return { props: { category_filter_option: [], allItemsData: [] } };
      }
    } catch (error) {
      console.log(error);
    }

    if (search) url += `&q=${search}`;

    const allItemsData = await fetchAPI(url);

    return {
      props: { category_filter_option: categoryFilterOption, allItemsData },
    };
  } catch (error) {
    return {
      props: { category_filter_option: categoryFilterOption, allItemsData: [] },
    };
  }
};
