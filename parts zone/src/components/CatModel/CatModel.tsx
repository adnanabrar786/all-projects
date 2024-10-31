import { getSubCategory } from "@/services/products.service";
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
import { useSearchParams } from "next/navigation";
import { Catpic2 } from "../config/route/imgaes.routes";

interface Props {
  selectedSubCategory?: string | null;
  setSelectedSubCategory?: (selectedSubCategory: string | null) => void;
  selectedSearchByTypes?: string | null;
  setSelectedSearchByTypes?: (selectedSearchByTypes: string | null) => void;
}

const CatModel = ({
  selectedSubCategory,
  setSelectedSubCategory,
  selectedSearchByTypes,
  setSelectedSearchByTypes,
}: Props) => {
  const searchParams = useSearchParams();

  const category_id = searchParams.get("category_id");
  const category_name = searchParams.get("category");
  const sub_category_name = searchParams.get("subcategory");

  const useSubCategory = (id) => {
    return useQuery(["data", id], () => getSubCategory(id));
  };

  const {
    data: subCategoryData,
    isLoading,
    error,
  } = useSubCategory(category_id);

  const handleCategoryClick = (item) => {
    if (setSelectedSubCategory && setSelectedSearchByTypes) {
      setSelectedSubCategory(
        selectedSubCategory === item.name ? null : item.name
      );
      setSelectedSearchByTypes("");
    }
  };

  return (
    <Stack>
      <Accordion
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid var(--light-grey)",
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
            <Image src={Catpic2} alt={"logo image"} height={30} width={30} />
            <Typography
              sx={{
                marginLeft: "24px",
                color: "var(--text-heading)",
                fontSize: "24px",
                fontWeight: "700",
                fontStyle: "normal",
                lineHeight: "noraml",
              }}
            >
              Model
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: { md: "0px 25px 40px 42px", xs: "0px 20px 30px 20px" },
            display: !selectedSearchByTypes ? "flex" : "none",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {subCategoryData?.data.data &&
            subCategoryData?.data.data.map((item, index) => (
              <Link
                href={
                  item.name !== sub_category_name
                    ? `/products/category_id/${category_id}/category/${category_name}/subcategory_id/${item.id}/subcategory/${item.name}`
                    : `/products/category_id/${category_id}/category/${category_name}/`
                }
                key={item.id}
              >
                <Stack
                  onClick={() => handleCategoryClick(item)}
                  key={index}
                  sx={{
                    padding: "20px 22px",
                    border: "1px solid var(--light-grey)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      sub_category_name === item.name ? "var(--dark-blue)" : "",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "400",
                      fontStyle: "normal",
                      lineHeight: "normal",
                      color:
                        sub_category_name === item.name
                          ? "var(--white)"
                          : "var(--text-grey)",
                    }}
                  >
                    {item.name}
                    <span
                      style={{
                        marginLeft: "8px",
                        fontWeight: "700",
                        color:
                          sub_category_name === item.name
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
  );
};

export default CatModel;
