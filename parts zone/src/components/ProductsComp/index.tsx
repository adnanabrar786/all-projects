import { GET_NAVBAR_MENU } from "@/routes/api";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { NextPageContext } from "next";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CatMenuBar from "../CatMenuBar/inedex";
import Productspagination from "../Productspagination";
import SearchBar from "../SearchBar";
import BreadCrumb from "../Styles/BreadCrumb";
import Underline from "../Underline";
import FilterProducts from "./FilterProducts";
import { useAppContext } from "@/context/appContext";

interface Props {
  category_filter_option: any;
  allItemsData: any;
}

const ProductsComp = ({ category_filter_option, allItemsData }: Props) => {
  const params = useParams();

  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const types = searchParams.get("types");
  const pathname = usePathname();
  const { replace } = useRouter();

  const category = `${params.category[3]
    .charAt(0)
    .toUpperCase()}${params.category[3].slice(1)}`;

  const categoryId = params.category[1];

  const subcategory = params.category[7];
  const subcategoryId = params.category[5];

  const handlesetSearchProducts = useDebouncedCallback(
    (newState: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", "1");
      if (newState) {
        params.set("search", newState.trim());
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    200
  );

  return (
    <>
      <Stack>
        <SearchBar
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          handlesetSearchProducts={handlesetSearchProducts}
          productsData={allItemsData.data}
        />

        <Stack
          direction={"row"}
          sx={{
            marginTop: { md: "25px", xs: "0px" },
            borderTop: { md: `1px solid var(--light-grey)`, xs: "none" },
          }}
        >
          <Stack
            sx={{
              display: { md: "flex", xs: "none" },
              maxWidth: "455px",
              width: "455px",
            }}
          >
            <Stack
              sx={{
                padding: "23px 0px 23px 50px",
                borderBottom: `1px solid var(--light-grey)`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: "700",
                  lineHeight: "normal",
                  fontStyle: "normal",
                  color: "var(--text-heading)",
                }}
              >
                Filters
              </Typography>
            </Stack>

            <FilterProducts category_filter_option={category_filter_option} />
          </Stack>

          <Stack
            sx={{
              maxWidth: "985px",
              width: "985px",
              borderLeft: { md: `1px solid var(--light-grey)`, xs: "none" },
              padding: { md: "39px 44px 0px 25px", xs: "40px 20px 0px 20px" },
            }}
          >
            <Stack
              sx={{
                gap: "14px",
              }}
            >
              <BreadCrumb
                categoryId={categoryId}
                subcategoryId={subcategoryId}
                CatOne={category ?? ""}
                CatTwo={subcategory ?? ""}
                types={types ?? ""}
                sxText={{
                  fontSize: { md: "18px", xs: "14px" },
                }}
              />
              <Stack
                sx={{
                  display: { md: "flex", xs: "none" },
                  width: "100%",
                  height: "300px",
                  position: "relative",
                  img: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  },
                }}
              >
                <Image
                  priority
                  src={"/FactoryBanner.svg"}
                  fill
                  quality={100}
                  alt={"alt"}
                />
              </Stack>
            </Stack>

            <Stack>
              <Typography
                sx={{
                  marginTop: "30px",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                }}
              >
                {category && category} {types && types}
              </Typography>

              <Underline sx={{ marginTop: "10px" }} />
            </Stack>

            <Productspagination category={category} data={allItemsData.data} />
          </Stack>
        </Stack>

        <CatMenuBar
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          category_filter_option={category_filter_option}
        />
      </Stack>
    </>
  );
};

export default ProductsComp;

ProductsComp.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch(GET_NAVBAR_MENU);
  const json = await res.json();

  return { props: { categoryFilter: json.data } };
};
