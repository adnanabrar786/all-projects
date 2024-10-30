import { Skeleton } from "@mui/material";

export default function Loading() {
  return [1, 2, 3, 4].map((number) => {
    return (
      <Skeleton
        key={number}
        variant="rectangular"
        sx={{
          borderRadius: "0.3rem",
          height: "5rem",
          width: "100%",
          marginY: "0.6rem",
        }}
      />
    );
  });
}
