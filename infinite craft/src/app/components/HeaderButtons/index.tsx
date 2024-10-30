"use client";
import CustomContainedButton from "@/components/common/CustomContainedButton";
import CustomOutlinedButton from "@/components/common/CustomOutlinedButton";
import { Stack } from "@mui/material";

type Prop = {
  onClick: () => void;
};
export default function CustomButtons({ onClick }: Prop) {
  return (
    <Stack
      direction={"row"}
      sx={{ gap: "1.30rem", display: { xs: "none", md: "flex" } }}
    >
      <CustomOutlinedButton onClick={onClick} />
      <CustomContainedButton width="9rem" height="3rem" text="Try For Free" />
    </Stack>
  );
}
