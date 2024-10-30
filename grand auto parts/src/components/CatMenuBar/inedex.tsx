import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import FilterProducts from "../ProductsComp/FilterProducts";

interface Props {
  setShowCatMenu: (showCatMenu: boolean) => void;
  showCatMenu: boolean;
  category_filter_option: any;
}

const CatMenuBar = ({
  showCatMenu,
  setShowCatMenu,
  category_filter_option,
}: Props) => {
  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          position: "absolute",
          top: "100px",
          minHeight: "220vh",
          maxHeight: "auto",
          transform:
            showCatMenu === true ? "translateX(0px)" : "translateX(-100%)",
          width: "100%",
          transition: "all 1s",
          zIndex: "99",
          backgroundColor: "var(--white)",
          boxSizing: "border-box",
          display: { md: "none", xs: "flex" },
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            padding: "0px 20px",
            marginTop: "26px",
            display: "flex",
            alignItems: "center",
            img: {
              cursor: "pointer",
            },
          }}
        >
          <Image
            src={"/cross2.svg"}
            priority
            quality={100}
            width={24}
            height={24}
            alt="arrow"
            onClick={() => {
              setShowCatMenu(!showCatMenu);
            }}
          />
          <Typography
            sx={{
              marginLeft: "20px",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              color: "var(--black-footer)",
            }}
          >
            Filters
          </Typography>
        </Stack>

        <Stack
          sx={{
            marginTop: "25px",
            borderTop: "1px solid var( --light-grey)",
          }}
        >
          <FilterProducts category_filter_option={category_filter_option} />
        </Stack>
      </Stack>
    </>
  );
};

export default CatMenuBar;
