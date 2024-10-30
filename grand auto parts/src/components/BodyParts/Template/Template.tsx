import Link from "next/link";
import { Img } from "@/components/Styles/Image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

interface Props {
  src: string;
  name: string;
  make: string;
}

export default function Template({ src, name, make }: Props) {
  const router = useRouter();

  return (
    <Stack
      sx={{
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        height: { md: "220px", sm: "180.117px" },
        width: { md: "220px", sm: "180.117px" },
        border: "1px solid #F1F3F6",
        borderRadius: "6px",
      }}
    >
      <ButtonBase
        sx={{
          width: 128,
          height: 128,
          img: { objectFit: "contain" },
          marginTop: "1.5rem",
        }}
      >
        <Img priority alt="complex" src={src} fill sizes="100%" />
      </ButtonBase>
      <Box
        sx={{
          marginTop: "auto",
          width: "100%",
          height: "70px",
          backgroundColor: "white",
        }}
      >
        <Typography
          noWrap
          sx={{
            cursor: "pointer",
            fontWeight: "700",
            fontSize: { md: "14px", xs: "11.462" },
            paddingX: ".625rem",
            paddingTop: ".625rem",
          }}
        >
          Make: <span style={{ color: "#767676" }}>{make}</span>
        </Typography>

        <Typography
          noWrap
          sx={{
            cursor: "pointer",
            fontWeight: "700",
            fontSize: { md: "14px", xs: "11.462" },
            paddingX: ".625rem",
            paddingTop: "0.25rem",
            paddingBottom: "1.375rem",
          }}
        >
          Product: <span style={{ color: "#767676" }}>{name}</span>
        </Typography>
      </Box>
    </Stack>
  );
}
