import { fetchAPI } from "@/utils/fetch";
import ProductsComp from "@/components/ProductsComp";
import { ICategoryProducts } from "@/utils/interfaces/interfaces";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { GET_CATEGORIES } from "@/routes/api";

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

    categoryFilterOption = await fetchAPI(`${GET_CATEGORIES}?name=categories`);

    let url = "";
    const subcategory_Id = queryParams.subcategory_id;
    const category_Id = queryParams.category_id;
    const search = queryParams.search;
    const optionId = queryParams.option_id;
    const page = queryParams.page;

    const categoryId = subcategory_Id || category_Id;

    try {
      if (optionId) {
        url = `/product-options/?option_id=${optionId}&page=${page ?? 1}`;
      } else if (categoryId) {
        url = `/categories-products?category_id=${categoryId}&page=${
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
