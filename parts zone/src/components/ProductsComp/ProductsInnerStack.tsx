import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

import BreadCrumb from "../Styles/BreadCrumb";
import Underline from "../Underline";

const ProductsInnerStack = () => {
  const params = useParams();

  const category = `${params.category[3]
    .charAt(0)
    .toUpperCase()}${params.category[3].slice(1)}`;

  const subcategory = `${params.category[7]
    .charAt(0)
    .toUpperCase()}${params.category[7].slice(1)}`;

  return (
    <Stack
      direction={"row"}
      sx={{
        marginTop: { md: "25px", xs: "0px" },
        borderTop: { md: `1px solid var(--light-grey)`, xs: "none" },
      }}
    >
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
            CatOne={`${category}`}
            CatTwo={`${subcategory}`}
            CatThree="Accelerator Cable 18190-2342"
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
            {category}
          </Typography>

          <Underline sx={{ marginTop: "10px" }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductsInnerStack;
