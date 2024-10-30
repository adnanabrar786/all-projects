import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import FinancialLayout from "components/ui/layouts/FinancialLayout";
import { FINANCIAL_ASSESSMENT_FRAMEWORK } from "constants/pages.routes";

import { Swiper, SwiperSlide } from "swiper/react";

import { EFINANCIALLAYOUTTITLE } from "enums/enums";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "swiper/css";

const FinancialAssessment = () => {
  const [mySwiper, setMySwiper] = useState<any>({});
  const router = useRouter();

  return (
    <FinancialLayout title={EFINANCIALLAYOUTTITLE.VALUE_TITLE} value={17}>
      <Swiper
        onInit={(ev) => {
          setMySwiper(ev);
        }}
        style={{ width: "62vw", maxWidth: "1000px", padding: "1rem 0rem" }}
        slidesPerView={1}
      >
        {[1, 2, 3].map((_, index) => (
          <SwiperSlide key={index}>
            <Stack
              key={index}
              direction={"column"}
              sx={{
                marginTop: "10rem",
                justifyContent: "center",
              }}
            >
              <Stack
                direction={"row"}
                sx={{ gap: "0.5rem", marginTop: "4rem" }}
              >
                {index !== 0 && (
                  <FilledButton
                    secondary
                    onClick={() => {
                      mySwiper.slidePrev();
                    }}
                    text="Previous Step"
                  />
                )}

                <FilledButton
                  onClick={() => {
                    mySwiper.slideNext();
                    if (index === 2) {
                      router.push(FINANCIAL_ASSESSMENT_FRAMEWORK);
                    }
                  }}
                  text="Proceed"
                />
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </FinancialLayout>
  );
};

export default FinancialAssessment;
