import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { ROOT } from "../config/route/pages.routes";

const CopyRights = () => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        marginTop: "20px",
        paddingBottom: { lg: "40px", md: "30px", xs: "0px" },
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        Copyright 2022-2023
      </Typography>
      <Link href={ROOT} passHref>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#ffff",
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Parts Zone.
        </Typography>
      </Link>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        All Rights Reserved.
      </Typography>
    </Stack>
  );
};

export default CopyRights;
