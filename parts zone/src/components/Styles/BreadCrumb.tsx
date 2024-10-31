import { Box, Typography, Link as MUILink } from "@mui/material";
import { Stack, SxProps } from "@mui/system";
import Link from "next/link";
import {
  CATEGORY,
  CATEGORY_ID,
  PRODUCTS,
  SUB_CATEGORY_ID,
} from "../config/route/pages.routes";
import { useParams } from "next/navigation";

interface Props {
  CatOne: string;
  CatTwo?: string;
  CatThree?: string;
  types?: string;
  categoryId?: string; // Category ID to construct the URL
  subcategoryId?: string; // Subcategory ID to construct the URL
  productId?: string; // Product ID to construct the URL
  productCode?: string; // Product Code to construct the URL
  sx?: SxProps;
  sxText?: SxProps;
}

const BreadCrumb = ({
  CatOne,
  CatTwo,
  CatThree,
  types,
  categoryId,
  subcategoryId,
  productId,
  productCode,
  sx,
  sxText,
}: Props) => {
  const params = useParams();

  return (
    <Stack
      direction="row"
      sx={{
        padding: "14px 30px",
        backgroundColor: "#F1F1F1",
        borderRadius: "85px",
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: "var(--black)",
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          cursor: "pointer",
          textDecoration: "underline",
          span: {
            color: "var(--light-grey-100)",
          },
          ...sxText,
        }}
      >
        {/* Home Link */}
        <Link href="/" passHref>
          Home
        </Link>

        {/* Category Level */}
        {CatOne && (
          <>
            {" / "}
            <MUILink
              sx={{ display: "inline", color: "black" }}
              href={`${PRODUCTS}${CATEGORY_ID}/${categoryId}${CATEGORY}/${CatOne}`}
              component={CatTwo ? Link : "span"}
            >
              {CatOne}
            </MUILink>
          </>
        )}

        {/* Subcategory Level */}
        {CatTwo && (
          <>
            {" / "}
            <MUILink
              sx={{ display: "inline", color: "black" }}
              href={`${PRODUCTS}${CATEGORY_ID}/${categoryId}${SUB_CATEGORY_ID}/${subcategoryId}/subcategory/${CatTwo}`}
              component={CatThree ? Link : "span"}
            >
              {CatTwo}
            </MUILink>
          </>
        )}

        {/* Product Level */}
        {CatThree && (
          <>
            {" / "}
            {CatThree}
          </>
        )}
      </Typography>
    </Stack>
  );
};

export default BreadCrumb;
