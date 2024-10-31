import { ArrowDown, ArrowUP } from "@/components/config/route/images.routes";
import { AccordionDetails, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
interface Props {
  expanded: string;
  setExpanded: (expanded: string) => void;
  index: string;
  items: any;
  showMenuBar: boolean;
  setShowMenuBar: (showMenuBar: boolean) => void;
}

const CustomAccordion = ({
  expanded,
  setExpanded,
  index,
  items,
  showMenuBar,
  setShowMenuBar,
}: Props) => {
  return (
    <Accordion
      key={index}
      elevation={0}
      expanded={expanded === index}
      onChange={() => {
        if (expanded === index) {
          setExpanded("");
        } else {
          setExpanded(index);
        }
      }}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "0.5rem",
        boxShadow: "none",
        color: "var(--white)",
        border: "none",
        "::before": {
          backgroundColor: "transparent",
        },
        ".MuiButtonBase-root": {
          margin: "0px",
          padding: "0px 0px",
        },
        "& .MuiPaper-root . MuiPaper-elevation": {
          marginTop: "0px",
        },
        height: "100%",
      }}
    >
      <AccordionSummary
        sx={{
          "&.Mui-expanded": {
            minHeight: "40px",
          },

          "& .Mui-expanded": {
            marginY: "0px",
          },

          "& .MuiAccordionSummary-content": {
            marginTop: "0px",
          },

          backgroundColor: expanded === index ? "var(--dark-blue)" : "",
          borderRadius: "10px",
          borderBottomLeftRadius: "0rem",
          borderBottomRightRadius: "0rem",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:
              expanded === index ? "1px solid var(--white)" : "none",
            padding: "15px 8px",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              gap: "10px",
              alignItems: "center",
            }}
          >
            {expanded === index ? (
              <Image
                src={items.picture}
                width={28}
                height={28}
                quality={100}
                alt={"alt"}
                priority
              />
            ) : (
              <Image
                src={items.picture}
                width={28}
                height={28}
                quality={100}
                alt={"alt"}
                priority
              />
            )}

            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                onClick={(e) => {
                  if (index !== "0") {
                    e.preventDefault();
                  }
                }}
                href={`/products/category_id/${items.id}/category=${items.name}`}
              >
                <Typography
                  onClick={() => {
                    if (index === "0") {
                      setShowMenuBar(false);
                    }
                  }}
                  sx={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color:
                      expanded === index ? "var(--white)" : "var(--text-grey)",
                  }}
                >
                  {items.name}
                </Typography>
              </Link>
            </Stack>
          </Stack>
          {items.name !== "HOME" && (
            <Stack>
              {expanded === index ? (
                <Image
                  src={ArrowUP}
                  width={24}
                  height={24}
                  quality={100}
                  alt={"alt"}
                  priority
                />
              ) : (
                <Image
                  src={ArrowDown}
                  width={24}
                  height={24}
                  quality={100}
                  alt={"alt"}
                  priority
                />
              )}
            </Stack>
          )}
        </Stack>
      </AccordionSummary>
      {items.name !== "HOME" && (
        <AccordionDetails
          sx={{
            padding: "0px",
          }}
        >
          <Stack
            sx={{
              gap: "10px",
              backgroundColor: expanded === index ? "var(--dark-blue)" : "",
              padding: "10px 0px 20px 0px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            onClick={() => setShowMenuBar(false)}
          >
            {items.sub_categories?.map((subitem, index) => (
              <Link
                key={index}
                href={`/products/category_id/${items.id}/category=${items.name}/subcategory_id/${subitem.id}/subcategory/${subitem.name}`}
              >
                <Typography
                  key={index}
                  sx={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: "var(--white)",
                    paddingLeft: "41px",
                    "&:hover": {
                      WebkitTextStrokeWidth: "0.7px",
                      WebkitTextStrokeColor: "var(--black)",
                    },
                  }}
                >
                  {subitem.name}
                </Typography>
              </Link>
            ))}
          </Stack>
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default CustomAccordion;
