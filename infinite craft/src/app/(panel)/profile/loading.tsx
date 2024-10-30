import { Box } from "@mui/material";
import ProfileFormSkeleton from "./components/ProfileFormSkeleton";
import ProfileTopSkeleton from "./components/ProfileTopSkeleton";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <ProfileTopSkeleton />
      <ProfileFormSkeleton />
    </Box>
  );
}
