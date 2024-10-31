import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Template from "./Template";
import { PRODUCTSDETAILS } from "@/components/config/route/pages.routes";
import { generateSlug } from "@/utils/string";

interface Props {
  data: any;
  // setLoader: (value: boolean) => void;
}

export default function BodyPartsSlider({ data }: Props) {
  const [mySwiper, setMySwiper] = useState<any>({});
  const [showNavigation, setShowNavigation] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450 && window.innerWidth <= 549) {
        if (data.length <= 2) {
          setShowNavigation(false);
        } else {
          setShowNavigation(true);
        }
      } else if (window.innerWidth >= 550 && window.innerWidth <= 1299) {
        if (data.length <= 3) {
          setShowNavigation(false);
        } else {
          setShowNavigation(true);
        }
      } else if (window.innerWidth >= 1300 && window.innerWidth <= 1399) {
        if (data.length <= 4) {
          setShowNavigation(false);
        } else {
          setShowNavigation(true);
        }
      } else if (window.innerWidth >= 1400) {
        if (data.length <= 5) {
          setShowNavigation(false);
        } else {
          setShowNavigation(true);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        maxWidth: "1440px",
      }}
    >
      <Swiper
        onInit={(ev) => {
          setMySwiper(ev);
        }}
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
          {data?.map((item): any => (
            <SwiperSlide key={item.productOptionId}>
              <Link
                href={`${generateSlug(
                  `${PRODUCTSDETAILS}/category/${item.parentCategoryName}`
                )}/product_id/${item.productId}/name/${generateSlug(
                  item.productName.replaceAll("/", "-")
                )}/code/${generateSlug(
                  item.subCategoryName.replaceAll("/", "-")
                )}`}
              >
                <Template
                  src={item.productImage}
                  name={item.productName}
                  make={item.parentCategoryName}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Stack>

        {showNavigation && (
          <Stack
            direction={"row"}
            sx={{
              gap: "10px",
              justifyContent: "end",
              marginTop: "20px",
              marginRight: { xl: "40px" },
            }}
          >
            <Stack
              onClick={() => {
                mySwiper.slidePrev();
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              <Image
                src={"/arrowl.svg"}
                priority
                quality={100}
                width={24}
                height={24}
                alt="arrow"
              />
            </Stack>

            <Stack
              onClick={() => {
                mySwiper.slideNext();
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              <Image
                src={"/arrowr.svg"}
                priority
                quality={100}
                width={24}
                height={24}
                alt="arrow"
              />
            </Stack>
          </Stack>
        )}
      </Swiper>
    </Box>
  );
}
