import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import Stack from "@mui/system/Stack";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  category_filter_option: any;
  selectedSearchByTypes?: string | null;
  setSelectedSearchByTypes?: (selectedSearchByTypes: string | null) => void;
}

const index = ({
  category_filter_option,
  selectedSearchByTypes,
  setSelectedSearchByTypes,
}: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleCategoryClick = (item) => {
    if (setSelectedSearchByTypes) {
      setSelectedSearchByTypes("");
    }
  };

  return (
    <>
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
              <Image
                src={"/catpic1.svg"}
                alt={"logo image"}
                height={30}
                width={30}
              />
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
                Make
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: { md: "0px 25px 40px 42px", xs: "0px 20px 30px 20px" },
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {category_filter_option &&
              category_filter_option.data &&
              category_filter_option.data.map((item, index) => (
                <Link
                  href={
                    item.name !== category
                      ? `/products?category_id=${
                          item.id
                        }&category=${encodeURIComponent(item.name)}`
                      : `/products?category_id=${
                          item.id
                        }&category=${encodeURIComponent(item.name)}`
                  }
                  key={item.id}
                >
                  <Stack
                    onClick={() => handleCategoryClick(item)}
                    sx={{
                      padding: "20px 22px",
                      border: "1px solid var(--light-grey)",
                      borderRadius: "8px",
                      cursor: "pointer",

                      backgroundColor:
                        category == item.name ? "var(--dark-blue)" : "",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "400",
                        fontStyle: "normal",
                        lineHeight: "normal",
                        color:
                          category == item.name
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
                            category == item.name
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

export default index;
