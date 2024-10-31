import Image from "next/image";
import { useState } from "react";
import Box from "@mui/system/Box";
import Template from "./Template";
import Stack from "@mui/system/Stack";
import { enginePartsLists } from "@/constant/data";
import { Swiper, SwiperSlide } from "swiper/react";

export default function EnginepartsSlider() {
  const [mySwiper, setMySwiper] = useState<any>({});

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
      >
        <Stack
          sx={{
            background: "aqua",
            margin: "0 100px",
          }}
        >
          {enginePartsLists.map(
            (item: {
              id: number;
              name: string;
              make: string;
              img: string;
            }): any => (
              <SwiperSlide key={item.id}>
                <Template src={item.img} name={item.name} make={item.make} />
              </SwiperSlide>
            )
          )}
        </Stack>

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
      </Swiper>
    </Box>
  );
}
