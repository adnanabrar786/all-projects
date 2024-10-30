import { Box, Skeleton } from "@mui/material";

export default function ProfileTopSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "16rem",
        display: "flex",
        gap: "1.875rem",
        alignItems: "center",
        paddingLeft: { xs: "0.3rem", sm: "3.75rem" },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          borderRadius: "50%",
          height: { xs: "7.5rem", sm: "12.5rem" },
          width: { xs: "7.5rem", sm: "12.5rem" },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "0.6rem",
            height: "3rem",
            width: "9.375rem",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "0.6rem",
            height: "3rem",
            width: "6rem",
          }}
        />
      </Box>
    </Box>
  );
}
