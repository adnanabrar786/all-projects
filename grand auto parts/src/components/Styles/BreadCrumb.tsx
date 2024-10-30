import { Typography } from "@mui/material";
import { Stack, SxProps } from "@mui/system";

interface Props {
  CatOne: string;
  CatTwo?: string;
  CatThree?: string;
  types?: string;
  sx?: SxProps;
  sxText?: SxProps;
}

const BreadCrumb = ({ CatOne, CatTwo, CatThree, sx, sxText, types }: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        padding: "14px 30px",
        backgroundColor: "#F1F1F1",
        borderRadius: "85px",
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: "var(--black)",
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          cursor: "pointer",
          span: {
            color: "var(--light-grey-100)",
          },
          ...sxText,
        }}
      >
        {types
          ? `Home / ${types}`
          : `Home / ${CatOne ? CatOne : ""}${CatTwo ? " / " + CatTwo : ""}${
              CatThree ? " / " + CatThree + "" : ""
            }`}
      </Typography>
    </Stack>
  );
};

export default BreadCrumb;
