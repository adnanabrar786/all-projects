import { Box, Skeleton } from "@mui/material";

export default function ProfileFormSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", md: "26rem" },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "1.875rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          borderRadius: "0.3rem",
          height: { xs: "12.5rem", sm: "70%" },
          width: { xs: "90%", sm: "20%" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          width: "70%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1.3rem",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "0.3rem",
              height: "3rem",
              width: { xs: "100%", sm: "50%" },
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "0.3rem",
              height: "3rem",
              width: { xs: "100%", sm: "50%" },
            }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "0.3rem",
            height: "3rem",
          }}
        />
        <Box sx={{ display: "flex", gap: "1.3rem" }}>
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "0.3rem",
              height: "3rem",
              width: "4.375rem",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "0.3rem",
              height: "3rem",
              width: "4.375rem",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
