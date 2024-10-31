import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppLoader } from "../Apploader";
import SearchButton from "../SearchButton";
import { PRODUCTSDETAILS } from "../config/route/pages.routes";
import { generateSlug } from "@/utils/string";

interface Props {
  setShowCatMenu: (showCatMenu: boolean) => void;
  showCatMenu: boolean;
  handlesetSearchProducts: (newState: string | null) => void;
  productsData: any;
}

const SearchBar = ({
  showCatMenu,
  setShowCatMenu,
  handlesetSearchProducts,
  productsData,
}: Props) => {
  const params = useParams();
  const category = params.category[3];
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [isSearchEmpty, setIsSearchEmpty] = useState(
    search === null || search === ""
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [productsData]);

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          margin: { md: "31px 100px 0px 100px", xs: "22px 20px 0px 20px" },
          height: "70px",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "var(--search-background)",
            padding: "25px 0px 25px 26px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            width: { md: "50%", xs: "100%" },
          }}
        >
          <Image
            src={"/greySearchIcon.svg"}
            priority
            quality={100}
            width={25}
            height={25}
            alt="pic"
          />

          <TextField
            autoComplete="off"
            sx={{
              flex: "1",
              outline: "none",
              border: "none",
              fieldset: { border: "none" },
            }}
            placeholder="Search for Items"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => {
              handlesetSearchProducts(e.target.value);
              setIsSearchEmpty(e.target.value === "");
              setIsLoading(true);
            }}
          />
        </Stack>

        <SearchButton
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          onClick={() => {
            if (searchParams.get("search")) {
              handlesetSearchProducts(search);
            }
          }}
        />
        <Stack
          sx={{
            position: "absolute",
            top: "70px",
            backgroundColor: "var(--white)",
            border: "1px solid var(--dark-blue)",
            borderTop: "none",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            zIndex: "100",
            display: isSearchEmpty ? "none" : "flex",
            width: { xl: "56.5%", lg: "57.5%", md: "60%", xs: "100%" },
            minHeight: "100px",
          }}
        >
          <Stack
            sx={{
              margin: "24px 20px",
              position: "relative",
            }}
          >
            {isLoading ? (
              <>
                <AppLoader />
              </>
            ) : (
              <>
                {productsData &&
                productsData.products &&
                productsData.products.length === 0 ? (
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                        margin: "10px 20px",
                      }}
                    >
                      No Products Found
                    </Typography>
                  </Stack>
                ) : (
                  <Stack>
                    {productsData &&
                      productsData.products &&
                      productsData.products.map((product, index) => (
                        <Stack
                          key={index}
                          sx={{
                            borderBottom:
                              index === productsData.length - 1
                                ? "none"
                                : "1px solid var(--light-grey)",
                          }}
                        >
                          <Link
                            href={`${generateSlug(
                              `${PRODUCTSDETAILS}/category/${category}`
                            )}/product_id/${
                              product.Products.id
                            }/name/${generateSlug(
                              product.Products.name.replaceAll("/", "-")
                            )}/code/${generateSlug(
                              product.Products.code.replaceAll("/", "-")
                            )}`}
                          >
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "normal",
                                margin: "10px 20px",
                              }}
                            >
                              {product.Products.name}
                            </Typography>
                          </Link>
                        </Stack>
                      ))}
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SearchBar;
