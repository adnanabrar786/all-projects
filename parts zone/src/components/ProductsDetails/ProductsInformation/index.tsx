import ProductsNotFound from "@/components/ProductsNotFound";
import { Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  product: any;
}

const ProductsInformation = ({ product }: Props) => {
  const [mySwiper, setMySwiper] = useState<any>({});

  let firstImage = product.data.product.product_images?.[0]?.url;
  let arrayImage = product.data.product.product_images;

  const [image, setImage] = useState<string>(firstImage);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleClickSmallSlider = (selectedImage: string, index: number) => {
    setImage(selectedImage);
    setSelectedImageIndex(index);
  };

  const OEM = product.data.product.code;

  useEffect(() => {
    setImage(firstImage);
  }, [firstImage]);

  return (
    <Fragment>
      {!product.hasError ? (
        <Stack
          direction={{ lg: "row", xs: "column" }}
          sx={{
            marginTop: { lg: "30px", xs: "20px" },
            display: "flex",
            gap: "25px",
            alignItems: { lg: "stretch", xs: "center" },
          }}
        >
          <Stack
            sx={{
              width: { md: "700px", xs: "100%" },
              maxWidth: { md: "700px", xs: "100%" },
            }}
          >
            {arrayImage ? (
              <Fragment>
                <Stack
                  direction={"row"}
                  sx={{
                    border: "0.2px solid var(--light-grey)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: { lg: "500px", xs: "300px" },
                    position: "relative",
                    maxWidth: "700px",
                    img: {
                      width: "100%",
                    },
                  }}
                >
                  <Image src={image} priority quality={100} alt="pic" fill />
                </Stack>

                {arrayImage.length > 1 && (
                  <Stack
                    direction={"row"}
                    sx={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "10px",
                      height: "90px",
                      position: "relative",
                      alignItems: "center",
                      boxSizing: "border-box",
                      maxWidth: "700px",
                    }}
                  >
                    <Stack
                      onClick={() => {
                        mySwiper.slidePrev();
                        const currentIndex = mySwiper.realIndex;
                        const previousImage =
                          arrayImage[
                            (selectedImageIndex - 1 + arrayImage.length) %
                              arrayImage.length
                          ].img;
                        setTimeout(() => {
                          setImage(previousImage);
                          setSelectedImageIndex(
                            (selectedImageIndex - 1 + arrayImage.length) %
                              arrayImage.length
                          );
                        }, 300);
                      }}
                      direction={"row"}
                      sx={{
                        zIndex: "2",
                        position: "absolute",
                        left: "0px",
                        backgroundColor: " rgba(21, 89, 50, 0.70)",
                        width: "20px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        src={"/whiteLeftArrow.png"}
                        priority
                        quality={100}
                        width={6.58}
                        height={11.17}
                        alt="arrow"
                      />
                    </Stack>
                    <Swiper
                      onInit={(ev) => {
                        setMySwiper(ev);
                      }}
                      slidesPerView={
                        arrayImage.length < 5 ? arrayImage.length : 3
                      }
                      spaceBetween={arrayImage.length < 5 ? 10 : 25}
                      breakpoints={{
                        425: {
                          slidesPerView:
                            arrayImage.length < 5 ? arrayImage.length : 4,
                          spaceBetween: 15,
                        },
                        550: {
                          slidesPerView:
                            arrayImage.length < 5 ? arrayImage.length : 5,
                          spaceBetween: 15,
                        },
                        750: {
                          slidesPerView:
                            arrayImage.length < 5 ? arrayImage.length : 5,
                          spaceBetween: 15,
                        },
                        1300: {
                          slidesPerView:
                            arrayImage.length < 5 ? arrayImage.length : 6,
                          spaceBetween: 8,
                        },
                        1399: {
                          slidesPerView:
                            arrayImage.length < 5 ? arrayImage.length : 6,
                          spaceBetween: 8,
                        },
                      }}
                      loop={true}
                    >
                      {arrayImage?.map(
                        (
                          item: { id: number; img: string },
                          index: number
                        ): any => (
                          <SwiperSlide key={item.id}>
                            <Stack
                              direction={"row"}
                              sx={{
                                height: { lg: "90px", xs: "80px" },
                                width: { lg: "108px", xs: "98px" },
                                border: `0.2px solid ${
                                  selectedImageIndex === index
                                    ? "var(--black)"
                                    : "var(--light-grey)"
                                }`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={() =>
                                handleClickSmallSlider(item.img, index)
                              }
                            >
                              <Stack
                                sx={{
                                  height: { lg: "80px", xs: "71.11px" },
                                  width: { lg: "93px", xs: "77.18px" },
                                  position: "relative",
                                  img: {
                                    width: "70%",
                                  },
                                }}
                              >
                                <Image
                                  src={item.img}
                                  priority
                                  quality={100}
                                  alt="pic"
                                  fill
                                />
                              </Stack>
                            </Stack>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>

                    <Stack
                      onClick={() => {
                        mySwiper.slideNext();
                        const currentIndex = mySwiper.realIndex;
                        const nextImage =
                          arrayImage[
                            (selectedImageIndex + 1) % arrayImage.length
                          ].img;
                        setTimeout(() => {
                          setImage(nextImage);
                          setSelectedImageIndex(
                            (selectedImageIndex + 1) % arrayImage.length
                          );
                        }, 300);
                      }}
                      direction={"row"}
                      sx={{
                        position: "absolute",
                        right: "0px",
                        backgroundColor: " rgba(21, 89, 50, 0.70)",
                        width: "20px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        cursor: "pointer",
                        zIndex: "1",
                      }}
                    >
                      <Image
                        src={"/whiteRightArrow.png"}
                        priority
                        quality={100}
                        width={6.58}
                        height={11.17}
                        alt="arrow"
                      />
                    </Stack>
                  </Stack>
                )}
              </Fragment>
            ) : (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--black)",
                    fontSize: { lg: "26px", xs: "22px" },
                    fontStyle: "normal",
                    lineHeight: "normal",
                    fontWeight: "700",
                  }}
                >
                  No Image Exit
                </Typography>
              </Stack>
            )}
          </Stack>

          <Stack
            sx={{
              flex: "1",
              width: "100%",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                color: "var(--black)",
                fontSize: { lg: "26px", xs: "22px" },
                fontStyle: "normal",
                lineHeight: "normal",
                fontWeight: "700",
              }}
            >
              {product.data.product.name}
            </Typography>

            <Typography
              sx={{
                marginTop: "20px",
                color: "var(--dark-blue)",
                fontSize: { lg: "18px", xs: "16px" },
                fontStyle: "normal",
                lineHeight: "normal",
                fontWeight: "700",
              }}
            >
              {product.data.product.code}
            </Typography>

            <Stack
              sx={{
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  marginTop: "25px",
                  color: "var( --text-grey)",
                  fontSize: { lg: "18px", xs: "16px" },
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontWeight: "400",
                }}
              >
                Make: {product.data.product.parent_category}
              </Typography>

              <Typography
                sx={{
                  color: "var( --text-grey)",
                  fontSize: { lg: "18px", xs: "16px" },
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontWeight: "400",
                }}
              >
                Product Type: Cables
              </Typography>

              <Typography
                sx={{
                  color: "var( --text-grey)",
                  fontSize: { lg: "18px", xs: "16px" },
                  fontStyle: "normal",
                  lineHeight: "normal",
                  fontWeight: "400",
                }}
              >
                OEM No: {OEM}
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                marginTop: { lg: "20px", xs: "30px" },
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Link href="/contact-us">
                <Button
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "var(--dark-blue)",
                    padding: "10px 80px",
                    borderRadius: "45px",
                    color: "var( --white)",
                    ":hover": {
                      backgroundColor: "#155932",
                    },
                    fontSize: "14px",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    fontWeight: "400",
                  }}
                >
                  Contact Us
                </Button>
              </Link>
            </Stack>
            <Divider
              sx={{ backgroundColor: "var(--light-grey)", marginTop: "30px" }}
            />

            <Typography
              sx={{
                marginTop: "15px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Description
            </Typography>
            <Typography
              sx={{
                marginTop: "11px",
                color: "var(--text-grey)",
                fontSize: { lg: "18px", xs: "16px" },
                fontStyle: "normal",
                lineHeight: "normal",
                fontWeight: "400",
              }}
            >
              {product.data.product.slug}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <ProductsNotFound />
      )}
    </Fragment>
  );
};

export default ProductsInformation;
