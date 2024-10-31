import { Box, Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Template from "../BodyParts/Template/Template";
import { generateSlug } from "@/utils/string";
import { PRODUCTSDETAILS } from "../config/route/pages.routes";

interface Props {
  product: any;
}

const ProductSlider = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        marginTop: "30px",
        boxSizing: "border-box",
        maxWidth: "1440px",
      }}
    >
      <Swiper
        slidesPerView={2}
        spaceBetween={35}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          450: {
            slidesPerView: 2,
            spaceBetween: 9.82,
          },
          550: {
            slidesPerView: 3,
            spaceBetween: 9.82,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1399: {
            slidesPerView: 5,
            spaceBetween: 35,
          },
        }}
        loop={true}
      >
        <Stack
          sx={{
            background: "aqua",
            margin: "0 100px",
          }}
        >
          {product.data.relatedProducts?.map(
            (item: {
              id: number;
              name: string;
              make: string;
              product_images: any;
              parent_category: string;
              url: string;
              code: string;
            }): any => (
              <SwiperSlide key={item.id}>
                <Link
                  href={`${generateSlug(
                    `${PRODUCTSDETAILS}/category/${item.parent_category}`
                  )}/product_id/${item.id}/name/${generateSlug(
                    item.name.replaceAll("/", "-")
                  )}/code/${generateSlug(item.code.replaceAll("/", "-"))}`}
                >
                  <Template
                    src={item.product_images[0].url}
                    name={item.name}
                    make={item.parent_category}
                  />
                </Link>
              </SwiperSlide>
            )
          )}
        </Stack>
      </Swiper>
    </Box>
  );
};

export default ProductSlider;
