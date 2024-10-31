import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const ProductsNotFound = () => {
  return (
    <>
      <Stack
        sx={{
          padding: { md: "50px 0px", xs: "20px 0px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "42px", xs: "32px" },
            textAlign: "center",
            fontWeight: "7000",
            color: "var(--dark-blue)",
          }}
        >
          Product Not Found
        </Typography>
      </Stack>
    </>
  );
};

export default ProductsNotFound;
