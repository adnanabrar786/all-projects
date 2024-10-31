import { Pagination, Typography } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { Stack } from "@mui/system";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import GreenButton from "../GreenButton";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/appContext";
import { useEffect } from "react";

interface Props {
  data: any;
}

const CustomPagination = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { setLoader, loader } = useAppContext();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const { items } = usePagination({
    count: 12,
  });

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          marginTop: "32px",
          padding: "10px 20px",
          display: { md: "flex", xs: "none" },
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          backgroundColor: "#F9F9F9",
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              color: "var(--text-heading-two)",
              textAlign: "justify",
            }}
          >
            Page
          </Typography>
        </Stack>

        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Pagination
            // TODO
            // onClick={() => {
            //   setLoader(true);
            //   document.body.style.overflow = "hidden";
            // }}
            page={currentPage}
            onChange={(e, pageNumber) => createPageURL(pageNumber)}
            siblingCount={3}
            sx={{
              alignSelf: "center",
              padding: "0.5rem",
              button: {
                border: "none",

                ":not(.Mui-selected)": {
                  color: "#9197B3",
                },
              },
              width: "100%",

              ul: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              },
              ".Mui-selected": {
                backgroundColor: "var( --white) !important",
                color: "var(--dark-blue) !important",
                ":hover": {
                  backgroundColor: "var( --white) !important",
                  color: "var(--dark-blue)  !important",
                },
                fontSize: "14px",
                fontStyle: "normal",
                lineHeight: "normal",
                fontWeight: "700",
              },
              ".MuiSvgIcon-root": {
                padding: "5px",
                color: "#000",
                backgroundColor: "var(--white)",
              },
            }}
            count={data?.totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          marginTop: "48.75px",
          display: { md: "none", xs: "flex" },
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <GreenButton
          onClick={() => {
            if (currentPage > 1) {
              createPageURL(currentPage - 1);
            }
          }}
          pic={"/arrowLeft.svg"}
        />
        <GreenButton
          onClick={() => {
            if (data.totalPages > currentPage) {
              createPageURL(currentPage + 1);
            } else if (data.totalPages === currentPage) {
              toast("This is your Last page");
            }
          }}
          pic={"/arrowRight.svg"}
        />
      </Stack>
    </>
  );
};

export default CustomPagination;
