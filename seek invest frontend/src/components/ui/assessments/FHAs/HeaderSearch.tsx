import { ClickAwayListener, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import MenuCard from "components/common/Card/MenuCard";
import SearchTextField from "components/common/Input/SearchTextField";
import CustomListItem from "components/common/List/CustomListItem";
import TextLg from "components/common/Text/TextLg";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import {
  ChevronDownWhiteIcon,
  LoadingDarkIcon,
  SearchOutlinedIcon,
} from "constants/images.routes";
import { CREATE_ASSESSMENT } from "constants/pages.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EAllAssessments } from "enums/enums";

import { EAssessmentTemplateTypes } from "enums/assessment";
import useDefaultAssessmentData from "hooks/useDefaultAssessmentData";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const { ALL_ASSESSMENTS } = EAllAssessments;
const { VALUES, RISK } = EAssessmentTemplateTypes;

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isLoading: boolean;
  refetch: any;
}

const assessments = [
  { title: "Values", category: VALUES },
  { title: "Risk", category: RISK },
];

const HeaderSearch = ({
  searchValue,
  setSearchValue,
  isLoading,
  refetch,
}: Props) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const { defaultAssessment } = useDefaultAssessmentData();
  const { deleteCustomQuestions } = useAssessmentContext();

  let defaultAssessments: { title: string; link: string }[] = [];

  if (defaultAssessment) {
    defaultAssessments = defaultAssessment.map((defaultAssess) => {
      return {
        title: defaultAssess.name,
        link: `${CREATE_ASSESSMENT}/${defaultAssess.parent_id}/${defaultAssess.id}`,
      };
    });
  }

  const handleFilterSearch = useDebouncedCallback((searchValue: string) => {
    refetch();
  }, 300);

  return (
    <>
      <Stack sx={{ pt: "2rem", px: "2rem" }}>
        <TextLg
          text={"Assessments"}
          sx={{
            fontWeight: "400",
            fontSize: "3rem",
            letterSpacing: "-0.06rem",
            lineHeight: "3.75rem",
          }}
        />
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mt: "1.5rem",
          }}
        >
          <Stack>
            <TextMd text="Financial HarMoney®  Assessments" />
            <TextXs text="Foster deeper relationships with your clients through targeted assessments" />
          </Stack>

          <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
            <Stack sx={{ position: "relative" }}>
              <FilledButton
                onClick={() => setOpenMenu(!openMenu)}
                text="Customize Assessment"
                endIcon={
                  <Image
                    className="searchIcon"
                    priority
                    src={ChevronDownWhiteIcon}
                    alt={"icon"}
                    width={20}
                    height={20}
                  />
                }
              />

              {openMenu && (
                <MenuCard sx={{ top: "2.6rem", width: "100%" }}>
                  {defaultAssessments &&
                    defaultAssessments.map(({ link, title }, index) => (
                      <Link
                        onClick={() => deleteCustomQuestions()}
                        target={"_self"}
                        key={index}
                        href={link}
                      >
                        <TextXs
                          text={title}
                          sx={{ padding: "0.62rem", fontWeight: "500" }}
                        />
                      </Link>
                    ))}
                </MenuCard>
              )}
            </Stack>
          </ClickAwayListener>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2rem",
        }}
      >
        <Stack direction={"row"} sx={{ gap: "8px" }}>
          <Link href={`${pathname}?category=${ALL_ASSESSMENTS}`}>
            <CustomListItem
              item={"All Assessments"}
              activeItem={activeCategory === ALL_ASSESSMENTS || !activeCategory}
            />
          </Link>
          {assessments.map((assessment, index) => (
            <Link
              key={index}
              href={`${pathname}?category=${assessment.category}`}
            >
              <CustomListItem
                item={assessment.title}
                activeItem={activeCategory === assessment.category}
              />
            </Link>
          ))}
        </Stack>

        <SearchTextField
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleFilterSearch(e.target.value);
          }}
          placeholder="Search assessments by name"
          defaultValue={searchValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "transparent",
            },
          }}
          startIcon={
            <Image
              className="searchIcon"
              priority
              src={SearchOutlinedIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          }
          endIcon={
            isLoading && (
              <Image
                className={"rotating"}
                priority
                src={LoadingDarkIcon}
                alt={"icon"}
                width={18}
                height={18}
              />
            )
          }
        />
      </Stack>
    </>
  );
};

export default HeaderSearch;
