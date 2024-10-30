import { Skeleton, Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import { CustomPagination } from "components/common/Pagination/CustomPagination";
import TextLg from "components/common/Text/TextLg";
import { ArrowLeftIcon, ArrowRightIcon } from "constants/images.routes";
import useModelsData from "hooks/useModelsData";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import ModelRow from "./ModelRow";

const ModelsTable = () => {
  // TODO: Confirm and delete
  const [pageNo, setPageNo] = useState(1);
  const {
    models: modelsData,
    isLoading,
    total_pages,
    total_items,
    items_per_page,
  } = useModelsData(pageNo);

  const models = modelsData && modelsData.length ? modelsData : [];

  const handleNext = () => setPageNo && setPageNo((prev: number) => prev + 1);
  const handlePrevious = () =>
    setPageNo && setPageNo((prev: number) => prev - 1);

  const handlePageChange = (_: any, value: SetStateAction<number>) => {
    setPageNo && setPageNo(value);
  };

  return (
    <>
      <TextLg
        text="All Models"
        sx={{
          fontWeight: "600",
          pb: "1rem",
          mt: "3rem",
          borderBottom: models.length ? "none" : "1px solid var(--gray-200)",
        }}
      />

      {isLoading ? (
        <Stack
          sx={{
            gap: "0.38rem",
            width: "100%",
          }}
        >
          {Array.from({ length: 3 }).map(() => (
            <Stack
              direction={"row"}
              sx={{
                width: "100%",
                height: "4.25rem",
                backgroundColor: "var(--ghost-white)",
                alignItems: "center",
                justifyContent: "space-between",
                px: "1rem",
              }}
            >
              <Skeleton
                width={"15rem"}
                height={"1rem"}
                sx={{ transform: "none", borderRadius: "0.1rem" }}
              />

              <Skeleton
                width={"8rem"}
                height={"2rem"}
                sx={{ transform: "none" }}
              />
            </Stack>
          ))}
        </Stack>
      ) : models.length ? (
        <Stack sx={{ gap: "0.38rem" }}>
          {models &&
            models.map((model, index) => (
              <ModelRow key={index} model={model} />
            ))}
        </Stack>
      ) : (
        <TextLg
          text="No Models"
          sx={{
            fontWeight: "500",
            color: "var(--text-grey)",
            mt: "1.7rem",
            textAlign: "center",
          }}
        />
      )}

      {total_items > items_per_page && (
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mt: "1.25rem",
          }}
        >
          <FilledButton
            disabled={pageNo == 1 ? true : false}
            onClick={handlePrevious}
            sx={{ height: "2rem", border: "none", boxShadow: "none" }}
            secondary
            text="Previous"
            startIcon={
              <Image
                className="searchIcon"
                priority
                src={ArrowLeftIcon}
                alt={"icon"}
                width={20}
                height={20}
                style={{ opacity: 0.5 }}
              />
            }
          />
          <CustomPagination
            hidePrevButton
            hideNextButton
            onChange={handlePageChange}
            page={pageNo}
            count={total_pages}
          />
          <FilledButton
            disabled={pageNo == total_pages ? true : false}
            sx={{ height: "2rem", border: "none", boxShadow: "none" }}
            onClick={handleNext}
            secondary
            text="Next"
            endIcon={
              <Image
                className="searchIcon"
                priority
                src={ArrowRightIcon}
                alt={"icon"}
                width={20}
                height={20}
                style={{ opacity: 0.5 }}
              />
            }
          />
        </Stack>
      )}
    </>
  );
};

export default ModelsTable;
