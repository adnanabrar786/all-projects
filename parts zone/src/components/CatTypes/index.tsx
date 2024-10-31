import { getTypes } from "@/services/products.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Search } from "../config/route/imgaes.routes";

interface Props {
  selectedSubCategory?: string | null;
  setSelectedSubCategory?: (selectedSubCategory: string | null) => void;
  selectedCategory?: string | null;
  setSelectedCategory?: (selectedCategory: string | null) => void;
  selectedSearchByTypes?: string | null;
  setSelectedSearchByTypes?: (selectedSearchByTypes: string | null) => void;
}

const CatTypes = ({
  selectedSubCategory,
  setSelectedSubCategory,
  selectedCategory,
  setSelectedCategory,
  selectedSearchByTypes,
  setSelectedSearchByTypes,
}: Props) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const category_id = params.category[1];
  const types = searchParams.get("types");
  const category = searchParams.get("category");

  const useSearchTypes = (id) => {
    return useQuery(["types", id], () => getTypes(id));
  };

  const { data: searchByTypes } = useSearchTypes(category_id);

  const handleSearchByTypes = (item) => {
    if (
      setSelectedSearchByTypes &&
      setSelectedSubCategory &&
      setSelectedCategory
    ) {
      setSelectedSearchByTypes(
        selectedSearchByTypes === item.value ? null : item.value
      );
      setSelectedSubCategory("");
      setSelectedCategory("");
    }
  };
  return (
    <>
      <Stack>
        <Accordion
          sx={{
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "var(--text-grey)" }} />}
            sx={{
              padding: { md: "0px 30px 0px 50px", xs: "0px 20px" },
              margin: "18px 0px",
              backgroundColor: "var(--white)",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
              }}
            >
              <Image src={Search} alt={"logo image"} height={26} width={26} />
              <Typography
                sx={{
                  marginLeft: "24px",
                  color: "var(--text-heading)",
                  fontSize: "24px",
                  fontWeight: "700",
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                Search by Types
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: { md: "1px 25px 40px 42px", xs: "0px 20px 30px 20px" },
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {searchByTypes?.data?.data &&
              searchByTypes?.data?.data?.map((item, index) => (
                <Link
                  href={
                    item.value !== types
                      ? `/products?category_id=${category_id}&option_id=${
                          item.options_id
                        }&types=${encodeURIComponent(item.value)}`
                      : `/products/category_id/${category_id}/category/Hino`
                  }
                  key={item.id}
                >
                  <Stack
                    onClick={() => handleSearchByTypes(item)}
                    key={index}
                    sx={{
                      padding: "20px 25px",
                      border: "1px solid var(--light-grey)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor:
                        item.value == selectedSearchByTypes
                          ? "var(--dark-blue)"
                          : "",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "400",
                        fontStyle: "normal",
                        lineHeight: "normal",
                        color:
                          item.value == selectedSearchByTypes
                            ? "var(--white)"
                            : "var(--text-grey)",
                      }}
                    >
                      {item.value}
                      <span
                        style={{
                          marginLeft: "8px",
                          fontWeight: "700",
                          color:
                            item.value == selectedSearchByTypes
                              ? "var(--white)"
                              : "var(--text-heading)",
                        }}
                      >
                        {item.count}
                      </span>
                    </Typography>
                  </Stack>
                </Link>
              ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
};

export default CatTypes;
