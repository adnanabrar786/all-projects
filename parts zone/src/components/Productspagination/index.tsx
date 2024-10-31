import { ButtonBase, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import Link from "next/link";
import { Fragment } from "react";
import CustomPagination from "../pagination/CustomPagination";
import ProductsNotFound from "../ProductsNotFound";
import { Img } from "../Styles/Image";
import { generateSlug } from "@/utils/string";
import { PRODUCTSDETAILS } from "../config/route/pages.routes";
import { useParams } from "next/navigation";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

interface Props {
  data: any;
  category: string | null;
}

const Productspagination = ({ data, category }: Props) => {
  const params = useParams();

  // TODO
  // const { setLoader, loader } = useAppContext();

  // useEffect(() => {
  //   setLoader(false);
  //   document.body.style.overflow = "initial";
  // }, [data]);

  return (
    <Fragment>
      <Box
        sx={{
          margin: { md: "40px 0 34px 0", xs: " 30px 0 48px 0" },
        }}
      >
        {data && data.products && data.products.length === 0 ? (
          <ProductsNotFound />
        ) : (
          <Grid
            container
            spacing={1}
            sx={{
              rowGap: { md: "50px", xs: "25px" },
            }}
          >
            {data &&
              data.products &&
              data.products.map((item, index) => (
                <Grid key={index} item lg={3} sm={4} xs={6}>
                  <Link
                    // TODO
                    // onClick={() => {
                    //   setLoader(true);
                    //   document.body.style.overflow = "hidden";
                    // }}
                    href={`${generateSlug(
                      `${PRODUCTSDETAILS}/category/${params.category[3]}`
                    )}/product_id/${item.Products.id}/name/${generateSlug(
                      item.Products.name.replaceAll("/", "-")
                    )}/code/${generateSlug(
                      item.Products.code.replaceAll("/", "-")
                    )}`}
                  >
                    <Stack
                      sx={{
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #F1F3F6",
                        borderRadius: "6px",
                      }}
                    >
                      <ButtonBase
                        sx={{
                          width: 128,
                          height: 128,
                          img: { objectFit: "contain" },
                          marginTop: "1.5rem",
                        }}
                      >
                        <Img
                          priority
                          alt="complex"
                          src={item.Products.product_images[0].url}
                          fill
                          sizes="100%"
                        />
                      </ButtonBase>
                      <Box
                        sx={{
                          marginTop: "auto",
                          width: "100%",
                          height: { sm: "70px", xs: "55px" },
                          backgroundColor: "white",
                        }}
                      >
                        {category && (
                          <Typography
                            noWrap
                            sx={{
                              cursor: "pointer",
                              fontWeight: "700",
                              fontSize: { md: "14px", xs: "12px" },
                              lineHeight: "normal",
                              paddingX: ".625rem",
                              paddingTop: ".625rem",
                            }}
                          >
                            Make:{" "}
                            <span style={{ color: "#767676" }}>{category}</span>
                          </Typography>
                        )}

                        <Typography
                          noWrap
                          sx={{
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: { md: "14px", xs: "11.462px" },
                            lineHeight: "normal",
                            paddingX: ".625rem",
                            paddingTop: category ? "0.25rem" : "1.25rem",
                            paddingBottom: "1.375rem",
                            span: {
                              fontSize: { md: "14px", xs: "11.462px" },
                            },
                          }}
                        >
                          Product:{" "}
                          <span
                            style={{
                              color: "#767676",
                            }}
                          >
                            {item.Products.name}
                          </span>
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Grid>
              ))}
          </Grid>
        )}
        <CustomPagination data={data} />
      </Box>
    </Fragment>
  );
};

export default Productspagination;
