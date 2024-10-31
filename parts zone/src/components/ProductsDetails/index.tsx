import Stack from "@mui/system/Stack";
import { useEffect, useState } from "react";
import "swiper/css";
import PartsHeading from "../PartsHeading";
import BreadCrumb from "../Styles/BreadCrumb";
import ProductsInformation from "./ProductsInformation";
import ProductSlider from "./ProductSlider";
import { useAppContext } from "@/context/appContext";

interface Props {
  product: any;
}
const ProductsDetails = ({ product }: Props) => {
  const { setLoader } = useAppContext();
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);

  useEffect(() => {
    setLoader(false);
    document.body.style.overflow = "initial";
  }, []);

  return (
    <Stack>
      <Stack
        sx={{
          margin: {
            md: "40px 100px 60px 100px",
            xs: "20px 20px 49.95px 20px",
          },
        }}
      >
        <BreadCrumb
          CatOne={product.data.product.parent_category ?? ""}
          CatTwo={product.data.product.category ?? ""}
          CatThree={product.data.product.name}
          categoryId={product.data.product.id}
          subcategoryId={product.data.product.id}
          sxText={{
            fontSize: { md: "18px", xs: "14px" },
          }}
        />

        <ProductsInformation product={product} />

        <Stack
          sx={{
            marginTop: { md: "42px", xs: "22px" },
          }}
        >
          <PartsHeading heading="Related Products" />
        </Stack>

        <ProductSlider product={product} />
      </Stack>
    </Stack>
  );
};

export default ProductsDetails;
