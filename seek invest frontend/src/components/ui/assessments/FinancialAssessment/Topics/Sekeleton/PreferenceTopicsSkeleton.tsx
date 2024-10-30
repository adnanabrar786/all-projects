import { Grid, Skeleton, Stack } from "@mui/material";

const PreferenceTopicsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <Grid key={i} item xs={3}>
          <Stack
            sx={{
              borderRadius: "0.375rem",
              backgroundColor: "var(--gray-200)",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem",
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <Skeleton
              variant="rounded"
              sx={{
                mt: "1rem",
                width: "100%",
                boxSizing: "border-box",
                height: "5.5rem",
              }}
            />
          </Stack>
        </Grid>
      ))}
    </>
  );
};

export default PreferenceTopicsSkeleton;
