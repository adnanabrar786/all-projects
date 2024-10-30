import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import { CustomPagination } from "components/common/Pagination/CustomPagination";
import { ArrowLeftIcon, ArrowRightIcon } from "constants/images.routes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  totalPages: number | undefined;
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
}

const OverviewPagination: React.FC<IProps> = (props) => {
  const { totalPages = 1, pageNo, setPageNo } = props;

  const handleNext = () => setPageNo((prev) => prev + 1);
  const handlePrevious = () => setPageNo((prev) => prev - 1);

  const handlePageChange = (_: any, value: SetStateAction<number>) => {
    setPageNo(value);
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.8rem",
        }}
      >
        <FilledButton
          disabled={pageNo == 1 ? true : false}
          onClick={handlePrevious}
          sx={{ height: "2rem" }}
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
          count={totalPages}
        />
        <FilledButton
          disabled={pageNo == totalPages ? true : false}
          onClick={handleNext}
          sx={{ height: "2rem" }}
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
    </>
  );
};

export default OverviewPagination;
