import { Grid, Skeleton, Stack } from "@mui/material";

const AssessmentsOverviewSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid key={i} item xs={3}>
          <Stack sx={{ gap: "0.25rem" }}>
            <Skeleton
              variant="rounded"
              sx={{ height: "9.968rem", borderRadius: "0.375rem" }}
            />
            <Skeleton variant="rounded" sx={{ height: "0.8rem", mt: "1rem" }} />
            <Skeleton
              variant="rounded"
              sx={{ height: "0.8rem", mt: "0.25rem" }}
            />
          </Stack>
        </Grid>
      ))}
    </>
  );
};

export default AssessmentsOverviewSkeleton;
